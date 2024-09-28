import { validate } from "../middleware/zod-validation.middleware.js";
import {
  CreateCourseSchema,
  UpdateCourseSchema,
  UserLoginSchema,
  UserSchema,
} from "./index.js";

export const ValidateUser = validate(UserSchema);
export const ValidateLogin = validate(UserLoginSchema);
export const ValidateCourse = validate(CreateCourseSchema);
export const ValidateUpdateCourse = validate(UpdateCourseSchema);
