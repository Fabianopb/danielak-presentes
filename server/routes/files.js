const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const AWS = require('aws-sdk');
const _ = require('lodash');
const sharp = require('sharp');
const multiparty = require('multiparty');
const fileType = require('file-type');
const fs = require('fs');
const bluebird = require('bluebird');

AWS.config.update({
  accessKeyId: process.env.DANIK_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DANIK_AWS_SECRET_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.DANIK_S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

router.route('/upload-file')
  .post((request, response) => {
    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) response.status(400).send(error);
      try {
        const filePath = files.file[0].path;
        const largeFileBuffer = fs.readFileSync(filePath);
        const type = fileType(largeFileBuffer);
        const timestamp = Date.now().toString();
        const largeFileName = `products/${timestamp}-lg`;
        const smallFileBuffer = await sharp(filePath).resize(100).toBuffer();
        const smallFileName = `products/${timestamp}-sm`;
        const data = await bluebird.all([
          uploadFile(largeFileBuffer, largeFileName, type),
          uploadFile(smallFileBuffer, smallFileName, type)
        ]);
        return response.status(200).send(data);
      } catch (error) {
        throw response.status(400).send(error);
      }
    });
  });

router.route('/delete-file')
  .post(bodyParser, async (request, response) => {
    try {
      const imagesArray = request.body.images;
      const params = {
        Bucket: process.env.DANIK_S3_BUCKET,
        Delete: {
          Objects: _.map(imagesArray, (image) => ({ Key: image }))
        }
      };
      const data = await s3.deleteObjects(params).promise();
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

module.exports = router;
