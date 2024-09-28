import type { Request, Response } from "express";
export async function GetUserDetailsController(req: Request, res: Response) {
  console.log(req.user);
}
