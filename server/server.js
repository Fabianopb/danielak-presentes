var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var products = require('./routes/products');

// var passport = require('passport');
// app.use(passport.initialize());

app.use('/api/products', products);

mongoose.connect(process.env.DANIK_MONGODB);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 9000);
console.log('Server up and running...');
