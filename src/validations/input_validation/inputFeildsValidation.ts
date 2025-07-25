import { z } from "zod";
import { UserRoles } from "../../models/user.roles.enum.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const emailConfirmEmailSchema = z
  .object({
    email: z.preprocess(
      (val) => (typeof val === "string" ? val.toLowerCase().trim() : val),
      z
        .string()
        .min(1, { message: "Email is required" })
        .regex(emailRegex, { message: "Invalid email format" })
    ),

    confirmEmail: z.preprocess(
      (val) => (typeof val === "string" ? val.toLowerCase().trim() : val),
      z.string().min(1, { message: "Please confirm your email" })
    ),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });


export const roleSchema = z.object({
  role: z
    .enum(Object.values(UserRoles) as [string, ...string[]])
    .refine((val) => !!val, {
      message: "Role is required",
    }),
});

const allowedRoles = [UserRoles.Parent, UserRoles.Student] as const;

export const parentStudentRoleSchema = z.object({
  role: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase().trim() : val),
    z.enum(allowedRoles)
  ),
});

export const ageSchema = z.object({
  age: z
    .number()
    .gt(10, { message: "Age must be greater than 10 and a positive number" }),
});


export const firstNameSchema = z.object({
  firstName: z.string().min(1, { message: "firstName is required" }),
});


// export const codeSchema = z.string().regex(/^\d{6}$/, {
//   message: "Code must be a 6-digit number",
// });

export const codeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, {
    message: "Code must be a 6-digit number",
  }),
});