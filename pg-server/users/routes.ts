import { Router } from 'express';

import bodyParser from 'body-parser';
import passport from 'passport';
import { registerAdminUser, generateJwt } from './handlers';
import initPassport from '../auth/passport';
import { User } from './types';

initPassport();
const router = Router();

router.route('/users/register').get(async (req, res) => {
  await registerAdminUser();
  return res.status(200).json('Admin user registered!');
});

router.route('/users/login').post(bodyParser.json(), passport.authenticate('local'), (req, res) => {
  const user = req.user as User | undefined;
  if (!user) {
    return res.status(401).json('info');
  }
  const tokenSignature = generateJwt(user.id, user.email);
  return res.status(200).json(tokenSignature);
});

export default router;
