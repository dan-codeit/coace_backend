import { PasswordSchema } from "./combinedEmailPasswordValidation.js";
import { parentStudentRoleSchema } from "./inputFeildsValidation.js";

export const fullParentStudentRegistrationSchema = PasswordSchema.and(parentStudentRoleSchema);
