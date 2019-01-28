const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Message = require('../models/message');
const authorize = require('../config/authorize');

router.route('/')
  .get(async (request, response) => {
    try {
      const messages = await Message.find({});
      return response.status(200).json(messages);
    } catch (error) {
      return response.status(400).send(error);
    }
  })
  .post(bodyParser, async (request, response) => {
    try {
      const message = new Message(request.body);
      await message.save();
      return response.status(200).json({id: message._id});
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router.route('/:id')
  .put(bodyParser, async (request, response) => {
    try {
      const message = await Message.findById(request.params.id);
      Object.assign(message, request.body);
      await message.save();
      return response.status(200).json({message: 'Message updated'});
    } catch (error) {
      return response.status(400).send(error);
    }
  });
//   .delete(authorize, async (request, response) => {
//     try {
//       await Message.remove({_id: request.params.id});
//       return response.status(200).json({message: 'Message removed'});
//     } catch (error) {
//       return response.status(400).send(error);
//     }
//   });

module.exports = router;
