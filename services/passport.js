import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { cookieExtractor } from "../services/common.js";
import dotenv from "dotenv";
dotenv.config();
let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;
const configurePassport = () => {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async function (email, password, done) {
        try {
          const data = { email: `${email}` };
          const user = await userModel.findOne(data, "id email password");
          if (!user) {
            return done(null, false, {
              message: "No user exists with this email.",
            });
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return done(null, false, { message: "Invalid credentials." });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
        console.log(jwt_payload,"jwt payload")
      try {
        const user = await userModel.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      console.log("Deserializing user ID:", user.id);
      return cb(null, user);
    });
  });
};


export default configurePassport