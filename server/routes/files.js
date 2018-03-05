const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const _ = require('lodash');

AWS.config.update({
  accessKeyId: process.env.DANIK_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DANIK_AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!/^image\/(jpe?g|png|gif)$/i.test(file.mimetype)) {
      return cb(new Error('File type not supported!'), false);
    }
    cb(null, true);
  },
  storage: multerS3({
    s3,
    bucket: process.env.DANIK_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      const extension = file.mimetype.split('/').pop();
      cb(null, `products/${Date.now().toString()}.${extension}`);
    }
  })
});

router.route('/upload-file')
  .post(upload.single('file'), (request, response, next) => {
    return response.status(200).send(request.file);
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
