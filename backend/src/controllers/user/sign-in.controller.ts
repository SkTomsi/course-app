import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema.js";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION_TIME, JWT_USER_SECRET } from "../../config/index.js";

export async function SignInController(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || !user.password) {
    return errorResponse(
      res,
      404,
      "User not found. If you have already signed up using Google ID, please sign in using your Google ID or Register with a new password"
    );
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return errorResponse(res, 400, "Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_USER_SECRET,
    {
      expiresIn: JWT_EXPIRATION_TIME,
    }
  );

  if (!token) {
    return errorResponse(res, 500, "Something went wrong");
  }
  return successResponse(
    res,
    { auth_token: token },
    "User Logged in successfully"
  );
}
