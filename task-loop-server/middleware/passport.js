const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const authConfig = require("../shared/configs/auth.config");
const User = require("../models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: authConfig.login.jwt,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await (await User.findById(payload.userId)).isSelected(
          "email id"
        );

        if (!user) {
          done(null, false);
          return;
        }
        done(null, user);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    })
  );
};
