const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const files = require('./routes/files');
const products = require('./routes/products');
const categories = require('./routes/categories');
const users = require('./routes/users');
const messages = require('./routes/messages');
const passport = require('passport');

app.use(passport.initialize());

app.use('/api/files', files);
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/messages', messages);

mongoose.connect(process.env.DANIK_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(path.resolve('..', 'build')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve('..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 9000);
console.log('Server up and running...');
