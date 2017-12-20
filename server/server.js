const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const products = require('./routes/products');
const passport = require('passport');

app.use(passport.initialize());

app.use('/api/products', products);

mongoose.connect(process.env.DANIK_MONGODB);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 9000);
console.log('Server up and running...');
