const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Product = require('../models/product');

router.route('/')
  .get(async (request, response) => {
    try {
      if (request.query._id === 'new') {
        const newProduct = new Product();
        return response.status(200).json([newProduct]);
      }
      const products = await Product.find(request.query);
      return response.status(200).json(products);
    } catch (error) {
      return response.status(400).send(error);
    }
  })
  .post(bodyParser, async (request, response) => {
    try {
      const product = new Product(request.body);
      await product.save();
      return response.status(200).json({message: 'New product saved!'});
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router.route('/:id')
  .put(bodyParser, async (request, response) => {
    try {
      const product = await Product.findById(request.params.id);
      Object.assign(product, request.body);
      await product.save();
      return response.status(200).json({message: 'Product updated'});
    } catch (error) {
      return response.status(400).send(error);
    }
  })
  .delete(async (request, response) => {
    try {
      await Product.remove({_id: request.params.id});
      return response.status(200).json({message: 'Product removed'});
    } catch (error) {
      return response.status(400).send(error);
    }
  });

module.exports = router;
