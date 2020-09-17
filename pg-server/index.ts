/// <reference types="./declarations" />
import express from 'express';
import path from 'path';
import passport from 'passport';
import userV2Routes from './users/routes';
import categoriesV2Routes from './categories/routes';
import messagesV2Routes from './messages/routes';
import productsV2Routes from './products/routes';
import filesV2Routes from './files/routes';

const app = express();

app.use(passport.initialize());

app.use('/api/v2', [
  userV2Routes,
  categoriesV2Routes,
  messagesV2Routes,
  productsV2Routes,
  filesV2Routes,
]);

app.use(express.static(path.resolve('build')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve('build', 'index.html'));
});

const port = process.env.PORT || 9000;

app.listen(port);
// eslint-disable-next-line no-console
console.log(`Server up and running on :${port}`);
