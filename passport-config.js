const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("./db/queries");

passport.use(
  new localStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {

        const user = await db.getUsersByEmail(email);

        console.log(
          `Email recieved is ${email}, Password is ${password}`
        );
        if (!user) {
          return done(null, false, {
            message: "Invalid username or password!",
          });
        }
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        
        if (!match) {
          return done(null, false, {
            message: "Invalid username or password!",
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
