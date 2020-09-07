const jwt = require('express-jwt');

const authorize = jwt({
  secret: process.env.DANIK_AUTH_KEY,
  userProperty: 'payload',
});

module.exports = authorize;
