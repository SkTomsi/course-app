import express from "express";
import { UserMiddleware } from "../middleware/user.middleware.js";
import { CreateCourseController } from "../controllers/course/create-course.controller.js";
import { ValidateCourse, ValidateUpdateCourse } from "../schemas/validators.js";
import { UpdateCourseController } from "../controllers/course/update-course.controller.js";
import { GetCourseController } from "../controllers/course/get-course.controller.js";
import { PurchaseCourseController } from "../controllers/course/purchase-course.controller.js";
import { CheckCourseExists } from "../utils/index.js";

const courseRouter = express.Router();

courseRouter.post(
  "/create",
  UserMiddleware,
  ValidateCourse,
  CreateCourseController
);
courseRouter.get(
  "/:courseId/update",
  UserMiddleware,
  ValidateUpdateCourse,
  UpdateCourseController
);

courseRouter.post(
  "/:courseId/purchase",
  UserMiddleware,
  CheckCourseExists,
  PurchaseCourseController
);

courseRouter.get("/:courseId", GetCourseController);

export default courseRouter;
