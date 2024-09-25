import express from "express";
import { UserMiddleware } from "../middleware/user.middleware.js";
import { CreateCourseController } from "../controllers/course/create-course.controller.js";

const courseRouter = express.Router();

courseRouter.post("/create", UserMiddleware, CreateCourseController);

export default courseRouter;
