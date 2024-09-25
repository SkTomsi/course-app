import type { Request, Response } from "express";

export function CreateCourseController(req: Request, res: Response) {
  res.json({
    message: "This endpoint lets you create a new course",
  });
}
