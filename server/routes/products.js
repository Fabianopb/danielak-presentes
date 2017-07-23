const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Product = require('../models/product');

const handleOnSave = function (product, response, message, object) {
  product.save(function (error) {
    if (error) { return response.status(400).send(error); }
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
      if (error) { return response.status(400).send(error); }
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

module.exports = router;
