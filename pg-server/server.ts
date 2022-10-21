import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import productsV2Routes from './products/routes';
import filesRoutes from './routes/files';
import bodyParser from 'body-parser';
import categoriesRouter from './routes/categories';
import usersRouter from './routes/users';
import messagesRouter from './routes/messages';

const port = process.env.PORT || 9090;

export const init = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v2', [productsV2Routes, filesRoutes]);

  app.use('/api/v3', [categoriesRouter, usersRouter, messagesRouter]);

  app.use(express.static(path.resolve('danik-dist')));

  app.get('*', (_, response) => {
    response.sendFile(path.resolve('danik-dist', 'index.html'));
  });

  app.use((error: any, _1: Request, res: Response, _2: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const name = error.name || 'Unknown error!';
    const message = error.message || 'Unknown error!';
    res.status(statusCode).json({ statusCode, name, message, error });
  });

  app.listen(port);

  console.log(`Server up and running on :${port}`);
};
