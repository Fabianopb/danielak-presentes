import express from 'express';
import path from 'path';
import Knex from 'knex';
import knexfile from './knexfile';

const app = express();

app.use(express.static(path.resolve('build')));

app.get('/api/v2', (req, res) => {
  res.send('Hello PG world!');
});

app.get('/api/v2/example', async (req, res) => {
  const db = await Knex(knexfile.development);
  const result = await db('hello_world').select();
  return res.json(result);
});

app.set('db', Knex(knexfile.development));
app.listen(9001);
// eslint-disable-next-line no-console
console.log(`PG server up and running in ${process.env.NODE_ENV} on :9001...`);
