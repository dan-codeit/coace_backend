import { RequestHandler } from "express";
import z from "zod";
import {PasswordReset} from "../../../models/zz.model.js";
import { EmailAndCodeSchema } from "../../../validations/input_validation/combinedEmailPasswordValidation.js";
import { formatZodErrors } from "../../../errors/formatErrors.error.js";
import { Op } from "sequelize";

type EmailAndCodeInput = z.infer<typeof EmailAndCodeSchema>;

export const verifyPasswordEmailResetCode: RequestHandler = async (
  req,
  res
) => {
  try {
    const result = EmailAndCodeSchema.safeParse(req.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return res.status(400).json({ errors });
    }

    const userInput: EmailAndCodeInput = result.data;
    const { code, email } = userInput;

const record = await PasswordReset.findOne({
    where: {
      email,
      code,
      used: false,
      expiresAt: { [Op.gt]: new Date() },
    },
  });

  if (!record) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  record.isUsed = true;
  await record.save();

  // Store email in session
  req.session.email = email;

  res.status(200).json({ message: "Code verified. You may now reset password."});


  } catch (error) {
    console.error("Error in verifying password reset code", error);
    res.status(500).json({ message: "Error in verifying password rest code." });
  }
};
