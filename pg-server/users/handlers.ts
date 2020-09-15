import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { getDb } from '../config';
import { User } from './types';

const table = 'users';

const getEncryptedCreds = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
  return { salt, hash };
};

export const isValidPassword = (password: string, hash: string, salt: string) =>
  hash === crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');

export const generateJwt = (id: string, email: string) => {
  if (!process.env.DANIK_AUTH_KEY) {
    throw new Error('Authentication key must be defined in the environment');
  }
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 120);

  const token = jwt.sign(
    {
      id,
      email,
      exp: Math.round(expiry.getTime() / 1000),
    },
    process.env.DANIK_AUTH_KEY,
  );

  return { token, expiry };
};

export const registerAdminUser = async () => {
  if (!process.env.DANIK_PASSWORD || !process.env.DANIK_USERNAME) {
    throw new Error('Admin username and password must be defined in the environment');
  }
  const db = await getDb();
  const users = await db<User>(table).select();
  if (users.length > 0) {
    throw new Error('Admin user already exists!');
  }
  const email = process.env.DANIK_USERNAME;
  const { salt, hash } = getEncryptedCreds(process.env.DANIK_PASSWORD);
  const adminUser = { email, salt, hash };

  await db<User>(table).insert(adminUser);
};

export const loginUser = async () => {};
