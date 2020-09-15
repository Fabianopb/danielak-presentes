import jwt from 'express-jwt';

if (!process.env.DANIK_AUTH_KEY) {
  throw new Error('Authentication key must be defined in the environment');
}

const authorize = jwt({
  secret: process.env.DANIK_AUTH_KEY,
  userProperty: 'payload',
});

export default authorize;
