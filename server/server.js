const dotenv = require('dotenv');

dotenv.config();

const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const files = require('./routes/files');
const products = require('./routes/products');
const categories = require('./routes/categories');
const users = require('./routes/users');
const messages = require('./routes/messages');
const { default: migrateData } = require('../scripts/migrateData');

const userV2Routes = require('../pg-server/users/routes').default;
const categoriesV2Routes = require('../pg-server/categories/routes').default;
const messagesV2Routes = require('../pg-server/messages/routes').default;
const productsV2Routes = require('../pg-server/products/routes').default;

app.use(passport.initialize());

app.use('/api/files', files);
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/messages', messages);

app.use('/api/v2', [userV2Routes, categoriesV2Routes, messagesV2Routes, productsV2Routes]);

mongoose.connect(process.env.DANIK_MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

migrateData();

app.use(express.static(path.resolve('build')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve('build', 'index.html'));
});

const port = process.env.PORT || 9000;

app.listen(port);
// eslint-disable-next-line no-console
console.log(`Server up and running on :${port}`);
