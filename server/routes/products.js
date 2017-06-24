var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var Product = require('../models/product');

var handleOnSave = function (product, response, message, object) {
  product.save(function (error) {
    if (error) { return response.status(400).send(error); }
    return response.status(200).json({message: message, object: object});
  });
};

router.route('/')
  .get(function (request, response) {
    Product.find(request.query, function (error, products) {
      return response.status(200).json(products);
    });
  })
  .post(bodyParser, function (request, response) {
    var product = new Product(request.body);
    handleOnSave(product, response, 'New product saved!');
  });

router.route('/:id')
  .put(bodyParser, function (request, response) {
    Product.findById(request.params.id, function (error, product) {
      if (error) { return response.status(400).send(error); }
      Object.assign(product, request.body);
      handleOnSave(product, response, 'Product updated!');
    });
  });

// router.route('/:id')
//   .delete(function(request, response) {
//     Product.findById(request.payload._id, function(error, product) {
//       product.beers.id(request.params.id).remove();
//       handleOnSave(product, response, 'Beer removed!');
//     });
//   });

module.exports = router;
