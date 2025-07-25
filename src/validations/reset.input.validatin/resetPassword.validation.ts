import { z } from "zod";
import { passwordSchema } from "../input_validation/password.validation.js";

export const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: "Reset token is required" }),
  newPassword: passwordSchema,
});
