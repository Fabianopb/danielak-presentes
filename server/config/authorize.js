const jwt = require('express-jwt');

const authorize = jwt({
  secret: process.env.BEER_CELLAR_KEY,
  userProperty: 'payload'
});

module.exports = authorize;
