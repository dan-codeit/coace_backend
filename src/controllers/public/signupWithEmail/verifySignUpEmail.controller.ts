import { RequestHandler } from "express";
import { Op } from "sequelize";
import z from "zod";
import { EmailVerification } from "../../../models/zz.model.js";
import { codeSchema } from "../../../validations/input_validation/inputFeildsValidation.js";
import { formatZodErrors } from "../../../errors/formatErrors.error.js";

type CodeInput = z.infer<typeof codeSchema>;

export const verifySignUpEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.session;

      if (!email) {
        return res.status(400).json({
          message: "Email not found in session. Please verify email first.",
        });
      }
    
    const result = codeSchema.safeParse(req.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return res.status(400).json({ errors });
    }

    const userInput: CodeInput = result.data;
    const { code } = userInput;

    const verificationRecord = await EmailVerification.findOne({
      where: {
        code,
        email,
        expiresAt: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (verificationRecord?.isVerified === true) {
      return res.status(409).json({ message: "Email already in use." });
    }

    if (!verificationRecord) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code." });
    }

    verificationRecord.isVerified = true;
    await verificationRecord.save();

    //req.session.email = undefined;
    //////////////////////////////////
    return res.status(200).json({ message: "Email verified successfully." });
    //////////////////////////////////
  } catch (error) {
    console.error("Error verifying email:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while verifying email." });
  }
};
