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
    form.parse(request, (error, fields, files) => {
      if (error) {
        return response.status(400).send(error);
      }
      const filePath = files.file[0].path;
      const largeFileBuffer = fs.readFileSync(filePath);
      const type = fileType(largeFileBuffer);
      const timestamp = Date.now().toString();
      const largeFileName = `products/${timestamp}-lg`;
      sharp(filePath)
        .resize(100)
        .toBuffer()
        .then(smallFileBuffer => {
          const smallFileName = `products/${timestamp}-sm`;
          bluebird.all([
            uploadFile(largeFileBuffer, largeFileName, type),
            uploadFile(smallFileBuffer, smallFileName, type)])
            .then(data => response.status(200).send(data))
            .catch(error => response.status(400).send(error));
        })
        .catch(error => response.status(400).send(error));
    });
  });

router.route('/delete-file')
  .post(bodyParser, (request, response) => {
    const imagesArray = request.body.images;
    const params = {
      Bucket: process.env.DANIK_S3_BUCKET,
      Delete: {
        Objects: _.map(imagesArray, (image) => {
          return { Key: image };
        })
      }
    };
    s3.deleteObjects(params, (error, data) => {
      if (error) {
        return response.status(400).send(error);
      }
      return response.status(200).send(data);
    });
  });

module.exports = router;
