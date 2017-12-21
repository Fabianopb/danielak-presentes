const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const passport = require('passport');
require('../config/passport');

// TODO: create endpoint to initialize admin user if non-existing
router.route('/register')
  .get((request, response) => {
    User.find({}, function (error, users) {
      if (error) {
        return response.status(400).send(error);
      }
      if (users.length > 0) {
        return response.status(400).send('Admin user already exists');
      }
      const user = new User();
      user.email = process.env.DANIK_USERNAME;
      user.setPassword(process.env.DANIK_PASSWORD);
      user.save(error => {
        if (error) {
          return response.status(400).send(error);
        }
        return response.status(200).json('Admin user generated!');
      });
    });
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
