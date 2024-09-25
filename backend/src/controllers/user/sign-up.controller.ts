import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { errorResponse } from "../../utils/reponses.js";

export async function CreateUserController(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;

  try {
    // check if the user exists in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    console.log(existingUser);
  } catch (error) {
    errorResponse(
      res,
      500,
      "Something went wrong while signing up, Please try again!"
    );
  }
}
