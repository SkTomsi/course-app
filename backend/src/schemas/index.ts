import { z } from "zod";

export const UserSchema = z.object({
  firstName: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, "Name cannot be empty"),
  lastName: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, "Name cannot be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .min(1, "Email cannot be empty")
    .email("Invalid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(1, "Password cannot be empty"),
  role: z.enum(["admin", "user"], {
    errorMap: (issue, ctx) => {
      return { message: "Invalid role" };
    },
  }),
});
