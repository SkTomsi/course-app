import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import { db } from "../../db/index.js";
import { courses, users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export async function GetCourseController(req: Request, res: Response) {
  const { courseId } = req.params;

  if (!courseId) {
    return errorResponse(res, 400, "Course ID is required");
  }

  try {
    const course = await db
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

    return successResponse(res, course, "Course retrieved successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Something went wrong");
  }
}
