import { validate } from "../middleware/zod-validation.middleware.js";
import { UserLoginSchema, UserSchema } from "./index.js";

export const ValidateUser = validate(UserSchema);
export const ValidateLogin = validate(UserLoginSchema);
