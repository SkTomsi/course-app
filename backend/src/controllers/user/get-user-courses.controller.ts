import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { courses } from "../../db/schema.js";

export async function GetUserCoursesController(req: Request, res: Response) {
  const userId = req.user?.id;

  try {
    const allCourses = await db.query.courses.findMany({
      where: eq(courses.creatorId, userId!),
    });

    return successResponse(res, allCourses, "Courses retrieved successfully");
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong");
  }
}
