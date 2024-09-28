import type { Request, Response } from "express";

export async function GetUserCoursesController(req: Request, res: Response) {
  const { userId } = req.params;
  const id = req.user;

  console.log(userId, id);
}
