import express from "express";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";
import type { User } from "../config/types.js";
import jwt from "jsonwebtoken";
import { UserMiddleware } from "../middleware/user.middleware.js";
import { JWT_EXPIRATION_TIME, JWT_USER_SECRET } from "../config/index.js";
import { successResponse } from "../utils/reponses.js";

const authRouter = express.Router();

passport.serializeUser(function (user: User, done) {
  done(null, user);
});

passport.deserializeUser(function (user: User, done) {
  done(null, user!);
});

//initialize
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!, // google client id
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // google client secret
      // the callback url added while creating the Google auth app on the console
      callbackURL: "http://localhost:4000/api/v1/auth/callback/google",
      passReqToCallback: true,
      scope: ["email", "profile"],
    },

    // returns the authenticated email profile
    async function (request, accessToken, refreshToken, profile, done) {
      // find the user in the database
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, profile.emails?.[0]?.value!),
      });

      if (existingUser) {
        console.log("user found");
        const oldUser = await db
          .update(users)
          .set({
            googleId: profile.id,
          })
          .where(eq(users.email, profile.emails?.[0]?.value!))
          .returning({
            id: users.id,
            email: users.email,
            googleId: users.googleId,
          });

        return done(null, {
          id: oldUser[0]?.id!,
          email: oldUser[0]?.email!,
          googleId: oldUser[0]?.googleId!,
        });
      }

      try {
        const newUser = await db
          .insert(users)
          .values({
            email: profile?.emails?.[0]?.value!,
            firstName: profile?.name?.givenName!,
            lastName: profile?.name?.familyName!,
            googleId: profile.id,
          })
          .returning({
            id: users.id,
            email: users.email,
            googleId: users.googleId,
          });
        console.log("new user created");
        return done(null, {
          id: newUser[0]?.id!,
          email: newUser[0]?.email!,
          googleId: newUser[0]?.googleId!,
        });
      } catch (e) {
        console.log(e);
        return done(null, false, { message: "something went wrong" });
      }
    }
  )
);

authRouter.get("/", UserMiddleware, function (req, res) {
  res.json({
    message: "You have reached a protected route",
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRouter.get(
  "/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    if (!req.user?.googleId) {
      console.log("Google ID is missing");
    }
    try {
      const token = jwt.sign(
        {
          id: req.user?.id,
        },
        JWT_USER_SECRET,
        {
          expiresIn: JWT_EXPIRATION_TIME,
        }
      );

      res.status(200).json({
        status: true,
        message: "Authentication successful",
        user: req.user,
        token,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        status: false,
        error: "Authentication failed",
      });
    }
  }
);

export default authRouter;
