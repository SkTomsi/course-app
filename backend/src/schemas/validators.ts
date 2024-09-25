import { validate } from "../middleware/zod-validation.middleware.js";
import { UserSchema } from "./index.js";

export const ValidateUser = validate(UserSchema);
