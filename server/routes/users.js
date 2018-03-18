const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const passport = require('passport');
require('../config/passport');

// TODO: create endpoint to initialize admin user if non-existing
router.route('/register')
  .get(async (request, response) => {
    try {
      const users = await User.find({});
      if (users.length > 0) throw new Error('Admin user already exists');
      const user = new User();
      user.email = process.env.DANIK_USERNAME;
      user.setPassword(process.env.DANIK_PASSWORD);
      await user.save();
      return response.status(200).json('Admin user generated!');
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router.route('/login')
  .post(bodyParser, (request, response) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return response.status(400).send(error);
      }
      if (!user) {
        return response.status(401).json(info);
      }
      const tokenSignature = user.generateJwt();
      return response.status(200).json(tokenSignature);
    })(request, response);
  });

module.exports = router;
