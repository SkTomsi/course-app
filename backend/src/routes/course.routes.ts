import express from "express";
import { UserMiddleware } from "../middleware/user.middleware.js";
import { CreateCourseController } from "../controllers/course/create-course.controller.js";
import { ValidateCourse, ValidateUpdateCourse } from "../schemas/validators.js";
import { UpdateCourseController } from "../controllers/course/update-course.controller.js";

const courseRouter = express.Router();

courseRouter.post(
  "/create",
  UserMiddleware,
  ValidateCourse,
  CreateCourseController
);
courseRouter.get(
  "/:courseId",
  UserMiddleware,
  ValidateUpdateCourse,
  UpdateCourseController
);

export default courseRouter;
