import { Router } from 'express';

import bodyParser from 'body-parser';
import passport from 'passport';
import { registerAdminUser, generateJwt } from './handlers';
import initPassport from '../auth/passport';
import { asyncHandler } from '../utils';

initPassport();
const router = Router();

router.route('/users/register').get(
  asyncHandler(async (req, res) => {
    await registerAdminUser();
    return res.status(200).json('Admin user registered!');
  }),
);

router.route('/users/login').post(bodyParser.json(), (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error) {
      next(error);
    }
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const tokenSignature = generateJwt(user.id, user.email);
    return res.status(200).json(tokenSignature);
  })(req, res, next);
});

export default router;
