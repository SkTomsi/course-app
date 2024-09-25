import type { NextFunction, Response, Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config/index.js";

export function UserMiddleware(
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
    const decoded = jwt.verify(token, JWT_USER_SECRET) as JwtPayload;

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
