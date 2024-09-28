import { z } from "zod";

export const UserSchema = z.object({
  firstName: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, "Name cannot be empty")
    .optional(),
  lastName: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, "Name cannot be empty")
    .optional(),
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
  role: z
    .enum(["admin", "user"], {
      errorMap: (issue, ctx) => {
        return { message: "Invalid role" };
      },
    })
    .optional(),
});

export const UserLoginSchema = z.object({
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
});

export const CreateCourseSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(1, "Title cannot be empty"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .trim()
    .min(1, "Description cannot be empty"),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, "Price cannot be empty"),
  imageUrl: z
    .string({
      required_error: "Image URL is required",
    })
    .trim()
    .url("Invalid URL")
    .min(1, "Image URL cannot be empty"),
});
export const UpdateCourseSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(1, "Title cannot be empty")
    .optional(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .trim()
    .min(1, "Description cannot be empty")
    .optional(),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, "Price cannot be empty")
    .optional(),
  imageUrl: z
    .string({
      required_error: "Image URL is required",
    })
    .trim()
    .url("Invalid URL")
    .min(1, "Image URL cannot be empty")
    .optional(),
});
