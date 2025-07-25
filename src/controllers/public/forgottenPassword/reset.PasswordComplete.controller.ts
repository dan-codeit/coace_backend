import { RequestHandler } from "express";
import { Parent } from "../../../models/zz.model.js";
import z from "zod";
import { formatZodErrors } from "../../../errors/formatErrors.error.js";
import { passwordSchema } from "../../../validations/input_validation/password.validation.js";

type PasswordInput = z.infer<typeof passwordSchema>;

export const completeResetPassword: RequestHandler = async (req, res) => {
try {

  //const { password } = req.body;
  const { email } = req.session;

  const result = passwordSchema.safeParse(req.body);

  if (!result.success) {
    const errors = formatZodErrors(result.error);
    return res.status(400).json({ errors });
  }

  const { password }: PasswordInput = result.data;

  if (!email) {
    return res
      .status(403)
      .json({ message: "Reset session expired or invalid" });
  }

  const user = await Parent.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.password = password;
  user.changed("password", true);
  await user.save();

  req.session.email = undefined;

  res
    .status(200)
    .json({ message: "Password reset successful. You can now log in." });
} catch (error) {
    console.error("Error in reset password complete, ", error)
    res.status(500).json({message: "Error in reset password complete."})
}
};
