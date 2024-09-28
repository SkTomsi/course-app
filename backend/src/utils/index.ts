import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { courses } from "../db/schema.js";
import { errorResponse } from "./reponses.js";
import type { Request, Response, NextFunction } from "express";

export async function CheckCourseExists(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return errorResponse(res, 400, "Course ID is required");
    }

    const course = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
    });

    if (!course) {
      return errorResponse(res, 404, "Course not found");
    }

    req.course = course;

    next();
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
}
