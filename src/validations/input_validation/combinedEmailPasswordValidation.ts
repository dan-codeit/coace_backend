import { codeSchema } from "./inputFeildsValidation.js";
import { oneEmailInputSchema } from "./oneEmailinput.validation.js";
import { passwordSchema } from "./password.validation.js";

/// password/confirmPassword
export const PasswordSchema = passwordSchema;
////
/// email and code
export const EmailAndCodeSchema = oneEmailInputSchema.and(codeSchema)
