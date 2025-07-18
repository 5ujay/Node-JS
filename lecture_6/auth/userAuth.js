const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// ✅ Register local strategy with Passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received credentials");
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      // const isPassMatch = user.password === password; // In production, use bcrypt
      // after hashing password
      const isPassMatch = user.comparePass(password);
      // create this function comparePass in userSchema
      if (isPassMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
