var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var products = require('./routes/products');

// var passport = require('passport');
// app.use(passport.initialize());

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api/products', products);

mongoose.connect(process.env.DANIK_MONGODB);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 9000);
console.log('Listening on port 9000...');
