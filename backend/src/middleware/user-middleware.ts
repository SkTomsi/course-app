import type { NextFunction, Response, Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = (req.headers["token"] as string) ?? "";

  if (!token) {
    return res.status(401).json({
      status: false,
      error: "No Token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (decoded.id) {
      req.user = decoded.id;
      next();
    } else {
      res.status(401).json({
        status: false,
        error: "Unauthorized",
      });
    }
  } catch (e) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}
