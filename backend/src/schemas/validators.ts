import { validate } from "../middleware/zod-validation.middleware.js";
import { CreateCourseSchema, UserLoginSchema, UserSchema } from "./index.js";

export const ValidateUser = validate(UserSchema);
export const ValidateLogin = validate(UserLoginSchema);
export const ValidateCourse = validate(CreateCourseSchema);
