const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Product = require('../models/product');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.DANIK_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DANIK_AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const handleOnSave = function (product, response, message, object) {
  product.save(function (error) {
    if (error) {
      return response.status(400).send(error);
    }
    return response.status(200).json({message, object});
  });
};

router.route('/')
  .get(function (request, response) {
    if (request.query._id === 'new') {
      const newProduct = new Product();
      return response.status(200).json([newProduct]);
    }
    Product.find(request.query, function (error, products) {
      if (error) {
        return response.status(400).send(error);
      }
      return response.status(200).json(products);
    });
  })
  .post(bodyParser, function (request, response) {
    const product = new Product(request.body);
    handleOnSave(product, response, 'New product saved!');
  });

router.route('/:id')
  .put(bodyParser, function (request, response) {
    Product.findById(request.params.id, function (error, product) {
      if (error) {
        return response.status(400).send(error);
      }
      Object.assign(product, request.body);
      handleOnSave(product, response, 'Product updated!');
    });
  })
  .delete(function (request, response) {
    Product.remove({_id: request.params.id}, function (error) {
      if (error) { return response.status(400).send(error); }
      return response.status(200).json('Product removed');
    });
  });

const upload = multer({
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
      cb(null, `${Date.now().toString()}.${extension}`);
    }
  })
});

router.route('/test-upload')
  .post(upload.single('file'), (request, response, next) => {
    return response.status(200).send(request.file);
  });

module.exports = router;
