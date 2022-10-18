import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import passport from 'passport';
import userV2Routes from './users/routes';
import categoriesV2Routes from './categories/routes';
import messagesV2Routes from './messages/routes';
import productsV2Routes from './products/routes';
import filesV2Routes from './files/routes';
import bodyParser from 'body-parser';
import categoriesRouter from './categories';

const port = process.env.PORT || 9090;

export const init = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(passport.initialize());

  app.use('/api/v2', [userV2Routes, categoriesV2Routes, messagesV2Routes, productsV2Routes, filesV2Routes]);

  app.use('/api/v3', [categoriesRouter]);

  app.use(express.static('danik-dist'));

  app.get('*', (request, response) => {
    response.sendFile(path.join('danik-dist', 'index.html'));
  });

  app.use((error: any, _1: Request, res: Response, _2: NextFunction) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ statusCode, error: error.message });
  });

  app.listen(port);

  console.log(`Server up and running on :${port}`);
};
