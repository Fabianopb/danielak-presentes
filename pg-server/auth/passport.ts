import passport from 'passport';
import { Strategy } from 'passport-local';
import { getDb } from '../config';
import { User } from '../users/types';
import { isValidPassword } from '../users/handlers';

const table = 'users';

const initPassport = () => {
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
      },
      async (username, password, done) => {
        try {
          const db = getDb();
          const user = await db<User>(table).where('email', username).first();
          if (!user || !isValidPassword(password, user.hash, user.salt)) {
            return done(null, false, {
              message: 'Invalid credentials',
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default initPassport;
