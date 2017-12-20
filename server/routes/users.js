const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const passport = require('passport');
require('../config/passport');

// TODO: create endpoint to initialize admin user if non-existing
router.route('/register')
  .post(bodyParser, (request, response) => {
    const user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.setPassword(request.body.password);
    user.save((error) => {
      if (error) {
        return response.status(400).send(error);
      }
      const tokenSignature = user.generateJwt();
      return response.status(200).json(tokenSignature);
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
