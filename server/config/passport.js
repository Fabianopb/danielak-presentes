const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (username, password, done) => {
      User.findOne({ email: username }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            message: "Invalid credentials",
          });
        }
        return done(null, user);
      });
    }
  )
);
