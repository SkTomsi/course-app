import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import { db } from "../../db/index.js";
import { courses, users } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export async function GetCourseController(req: Request, res: Response) {
  const { courseId } = req.params;

  console.log(courseId);

  if (!courseId) {
    return errorResponse(res, 400, "Course ID is required");
  }

  try {
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
    });

    return successResponse(res, course, "Course retrieved successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Something went wrong");
  }
}
