var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var Product = require('../models/product');

var saveData = function(user, error, response, message, object) {
  user.save(function(error) {
    if(error) { return response.status(400).send(error); }
    return response.status(200).json({message: message, beer: object || null});
  });
};

router.route('/')
  .get(function(request, response) {
    Product.find(request.query, function(error, products) {
      return response.status(200).json(products);
    });
  })
  .post(bodyParser, function(request, response) {
    var product = new Product(request.body);
    product.save(function(error) {
      if (error) {
        return response.status(400).send(error);
      }
      return response.status(200).json({product: product});
    });
  });

// router.route('/:id')
//   .put(bodyParser, function(request, response) {
//     Product.findById(request.payload._id, function(error, user) {
//       var beer = user.beers.id(request.params.id);
//       beer.name = request.body.name || beer.name;
//       beer.country = request.body.country || beer.country;
//       saveData(user, error, response, 'Beer updated!');
//     });
//   })
//   .delete(function(request, response) {
//     Product.findById(request.payload._id, function(error, user) {
//       user.beers.id(request.params.id).remove();
//       saveData(user, error, response, 'Beer removed!');
//     });
//   });

module.exports = router;
