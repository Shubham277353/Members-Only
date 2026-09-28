const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("./db/queries");

passport.use(
  new localStrategy(async (email, password, done) => {
    try {
      const user = await db.getUsersByEmail(email);

      if (!user) {
        return done(null, false, { message: "Invalid username or password!" });
      }
      const match = bcrypt.compare(user.password, password);

      if (!match) {
        return done(null, false, { message: "Invalid username or password!" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await db.getUsersByEmail(email);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;