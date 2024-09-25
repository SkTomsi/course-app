import express from "express";
import { UserMiddleware } from "../middleware/user.middleware.js";
import { CreateCourseController } from "../controllers/user/create-course.controller.js";
import { CreateUserController } from "../controllers/user/sign-up.controller.js";
import { ValidateUser } from "../schemas/validators.js";

const UserRouter = express.Router();

UserRouter.post("/signup", ValidateUser, CreateUserController);
UserRouter.post("/course", UserMiddleware, CreateCourseController);

export default UserRouter;
