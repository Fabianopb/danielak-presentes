var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var products = require('./routes/products');

// var passport = require('passport');
// app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api/products', products);

mongoose.connect(process.env.DANIK_MONGODB);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(process.env.PORT || 9000);
console.log('Listening on port 9000...');
