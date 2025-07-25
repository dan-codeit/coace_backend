import { createUserSchema } from "./input_validation/user.validation.js";
import { loginSchema } from "./authInput.validation/auth_input_validation.js";
import { resetPasswordSchema } from "./reset.input.validatin/resetPassword.validation.js";

export const input = {
  createUser: createUserSchema,
  login: loginSchema,
  resetPassword: resetPasswordSchema,
};
