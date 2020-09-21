import { Router } from 'express';

import bodyParser from 'body-parser';
import passport from 'passport';
import { registerAdminUser, generateJwt } from './handlers';
import initPassport from '../auth/passport';
import { asyncHandler } from '../utils';

class UnauthorizedError extends Error {
  public statusCode?: number;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

initPassport();
const router = Router();

router.route('/users/register').get(
  asyncHandler(async (req, res) => {
    await registerAdminUser();
    return res.status(200).json('Admin user registered!');
  }),
);

router.route('/users/login').post(bodyParser.json(), (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      next(error);
    }
    if (!user) {
      throw new UnauthorizedError(info.message);
    }
    const tokenSignature = generateJwt(user.id, user.email);
    return res.status(200).json(tokenSignature);
  })(req, res, next);
});

export default router;
