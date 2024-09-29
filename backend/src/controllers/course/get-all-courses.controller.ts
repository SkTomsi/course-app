import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { successResponse } from "../../utils/reponses.js";
import { courses, users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export async function GetAllCoursesController(req: Request, res: Response) {
  try {
    const allCourses = await db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.description,
        price: courses.price,
        imageUrl: courses.imageUrl,
        creator: {
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
      })
      .from(courses)
      .leftJoin(users, eq(courses.creatorId, users.id))
      .execute();

    return successResponse(
      res,
      allCourses,
      "All courses retrieved successfully"
    );
  } catch (error) {}
}
