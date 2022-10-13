import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import passport from 'passport';
import userV2Routes from './users/routes';
import categoriesV2Routes from './categories/routes';
import messagesV2Routes from './messages/routes';
import productsV2Routes from './products/routes';
import filesV2Routes from './files/routes';
import { NotFoundError } from './utils';

const port = process.env.PORT || 9090;

const app = express();

app.use(passport.initialize());

app.use('/api/v2', [userV2Routes, categoriesV2Routes, messagesV2Routes, productsV2Routes, filesV2Routes]);

app.use(express.static(path.resolve('dist')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve('dist', 'index.html'));
});

app.use(() => {
  throw new NotFoundError('Route not found');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ statusCode, error: error.message });
});

app.listen(port);
// eslint-disable-next-line no-console
console.log(`Server up and running on :${port}`);
