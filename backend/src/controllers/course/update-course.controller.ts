import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import { db } from "../../db/index.js";
import { courses } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";

export async function UpdateCourseController(
  req: Request<{ courseId: string }>,
  res: Response
) {
  const { title, description, price, imageUrl } = req.body;
  const { courseId } = req.params;

  console.log(req.user?.id);

  try {
    const course = await db
      .update(courses)
      .set({
        title: title ?? undefined,
        description: description ?? undefined,
        price: price ?? undefined,
        imageUrl: imageUrl ?? undefined,
      })
      .where(
        and(eq(courses.creatorId, req.user?.id!), eq(courses.id, courseId))
      )
      .returning({
        courseId: courses.id,
        courseName: courses.title,
      });

    console.log(course);

    if (!course || course.length === 0) {
      return errorResponse(
        res,
        404,
        "You don't have permission to update this course"
      );
    }

    return successResponse(res, course, "Course updated successfully!");
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong!");
  }
}
