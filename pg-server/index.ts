import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve('build')));

app.get('/api/v2', (req, res) => {
  res.send('Hello PG world!');
});

app.listen(9001);
// eslint-disable-next-line no-console
console.log('PG server up and running...');
