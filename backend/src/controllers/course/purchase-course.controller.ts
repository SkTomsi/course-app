import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/reponses.js";
import { db } from "../../db/index.js";
import { courses, purchases } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function PurchaseCourseController(req: any, res: Response) {
  const { courseId } = req.params;
  const userId = req.user?.id;
  const courseName = req.course?.title;

  if (userId === req.course?.creatorId) {
    return errorResponse(res, 400, "You can't purchase your own course");
  }

  const hasPurchasedCourse = await db.query.purchases.findFirst({
    where: and(eq(purchases.courseId, courseId), eq(purchases.userId, userId)),
  });

  if (hasPurchasedCourse) {
    return errorResponse(res, 400, "You have already purchased this course");
  }

  const purchaseId = nanoid();
  try {
    const purchasedCourse = await db.insert(purchases).values({
      purchaseId,
      courseId,
      userId,
    });

    return successResponse(
      res,
      {
        courseTitle: courseName,
      },
      "Course purchased successfully"
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Something went wrong", error);
  }
}
