import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const oneEmailInputSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(emailRegex, { message: "Invalid email format" }),
  })

