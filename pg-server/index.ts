import express from 'express';
import path from 'path';
import Knex from 'knex';
import knexfile from './knexfile';

const app = express();

app.use(express.static(path.resolve('build')));

app.get('/api/v2', (req, res) => {
  res.send('Hello PG world!');
});

app.set('db', Knex(knexfile.development));
app.listen(9001);
// eslint-disable-next-line no-console
console.log(`PG server up and running in ${process.env.NODE_ENV} on :9001...`);
