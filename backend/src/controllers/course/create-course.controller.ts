import type { Request, Response } from "express";
import { CreateCourseSchema } from "../../schemas/index.js";
import { db } from "../../db/index.js";
import { courses } from "../../db/schema.js";
import { errorResponse, successResponse } from "../../utils/reponses.js";

export async function CreateCourseController(req: Request, res: Response) {
  const { title, description, price, imageUrl } = req.body;

  const result = CreateCourseSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, 400, "Invalid request body");
  }

  try {
    const course = await db
      .insert(courses)
      .values({
        title,
        description,
        price,
        imageUrl,
        creatorId: Number(req.user),
      })
      .returning({
        title: courses.title,
        courseId: courses.id,
      });

    return successResponse(res, course, "Course created successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      500,
      "Something went wrong while creating course"
    );
  }
}
