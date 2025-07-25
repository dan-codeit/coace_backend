import { RequestHandler } from "express";
import { passwordSchema } from "../../../validations/input_validation/password.validation.js";
import { formatZodErrors } from "../../../errors/formatErrors.error.js";
import { updatePasswordForUsers } from "../../../validations/comparePassw/compareUserPass.js";

export const updateUserPassword: RequestHandler = async (req, res) => {
  try {
    const result = passwordSchema.safeParse(req.body);
    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return res.status(400).json({ errors });
    }
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = req.session;
    const { password } = result.data;

    const updateResult = await updatePasswordForUsers(userId, password);

    if (!updateResult.success) {
      return res.status(400).json({ message: updateResult.message });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
