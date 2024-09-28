import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { courses } from "../../db/schema.js";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import { nanoid } from "nanoid";

export async function CreateCourseController(req: Request, res: Response) {
  const { title, description, price, imageUrl } = req.body;

  try {
    const courseId = nanoid();

    const course = await db
      .insert(courses)
      .values({
        title,
        description,
        price,
        imageUrl,
        id: courseId,
        creatorId: req.user?.id,
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
