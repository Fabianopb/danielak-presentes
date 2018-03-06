const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const AWS = require('aws-sdk');
const _ = require('lodash');
const sharp = require('sharp');
const multiparty = require('multiparty');
const fileType = require('file-type');
const readChunk = require('read-chunk');

AWS.config.update({
  accessKeyId: process.env.DANIK_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DANIK_AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

router.route('/upload-file')
  .post((request, response) => {
    const form = new multiparty.Form();
    form.parse(request, (error, fields, files) => {
      if (error) {
        return response.status(400).send(error);
      }
      const filePath = files.file[0].path;
      const buffer = readChunk.sync(filePath, 0, 4100);
      const type = fileType(buffer);
      console.log('file type: ', type);
      sharp(filePath)
        .resize(100)
        .toBuffer()
        .then(fileBuffer => {
          const params = {
            ACL: 'public-read',
            Body: fileBuffer,
            Bucket: process.env.DANIK_S3_BUCKET,
            ContentType: type.mime,
            Key: `products/${Date.now().toString()}.${type.ext}`
          };
          s3.upload(params, (error, data) => {
            if (error) return response.status(400).send(error);
            console.log(data);
          });
        })
        .catch(err => response.status(400).send(err));
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
