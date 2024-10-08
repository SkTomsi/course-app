import express from "express";
import { UserMiddleware } from "../middleware/user.middleware.js";
import { CreateUserController } from "../controllers/user/sign-up.controller.js";
import {
  ValidateCourse,
  ValidateLogin,
  ValidateUser,
} from "../schemas/validators.js";
import { SignInController } from "../controllers/user/sign-in.controller.js";
import { CreateCourseController } from "../controllers/course/create-course.controller.js";
import { GetUserCoursesController } from "../controllers/user/get-user-courses.controller.js";
import { GetUserDetailsController } from "../controllers/user/get-user-details.controller.js";

const UserRouter = express.Router();

UserRouter.post("/signup", ValidateUser, CreateUserController);
UserRouter.post("/signin", ValidateLogin, SignInController);
UserRouter.get("/courses", UserMiddleware, GetUserCoursesController);
UserRouter.get("/", UserMiddleware, GetUserDetailsController);

export default UserRouter;
