import { z } from "zod";
import { passwordSchema } from "./password.validation.js";
import { UserRoles } from "../../models/user.roles.enum.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createUserSchema = z
  .object({
    firstName: z.string().min(1, { message: "firstName is required" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(emailRegex, { message: "Invalid email format" }),

    confirmEmail: z.string().min(1, { message: "Please confirm your email" }),

    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),

    age: z.number().positive({ message: "Age must be a positive number" }),

    role: z
      .enum(Object.values(UserRoles) as [string, ...string[]])
      .refine((val) => !!val, {
        message: "Role is required",
      }),
  })

