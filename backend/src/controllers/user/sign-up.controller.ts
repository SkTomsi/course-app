import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import bcrypt from "bcrypt";

export async function CreateUserController(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;

  try {
    // check if the user exists in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    const hashedPwd = await bcrypt.hash(password, 10);

    if (existingUser?.password) {
      return errorResponse(
        res,
        409,
        `User already exists with the email: ${email}`
      );
    }

    if (existingUser) {
      await db
        .update(users)
        .set({
          password: hashedPwd,
        })
        .where(eq(users.email, email));
      return successResponse(res, "User Updated Successfully");
    }

    const user = await db
      .insert(users)
      .values({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPwd,
      })
      .returning({
        id: users.id,
        email: users.email,
      });

    console.log(user);
    return successResponse(res, "User created successfully");
  } catch (error) {
    errorResponse(
      res,
      500,
      "Something went wrong while signing up, Please try again!"
    );
  }
}
