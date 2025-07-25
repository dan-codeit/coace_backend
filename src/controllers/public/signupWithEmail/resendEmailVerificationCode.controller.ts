import { RequestHandler } from "express";
import { generateSignUpEmailCode } from "../../../generator/generate.SignUpEmailCode.js";
import { sendSignUpEmailVerification } from "../../../services/send_SignupEmailVerification.js";
import {EmailVerification} from './../../../models/zz.model.js';

export const resendEmailVerificationCode: RequestHandler = async (req, res) => {
  try {
    const { email } = req.session;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
const record = await EmailVerification.findOne({ where: { email } });

    if (record?.isVerified === true) {
      return res.status(409).json({ message: "Email already in use." });
    }

if (!record) {
  return res.status(400).json({ message: "Email has not initiated signup." });
}
    const verification = await generateSignUpEmailCode(email);

    await sendSignUpEmailVerification(verification.code, email);

    return res.status(200).json({
      message: `A new verification code has been sent to ${email}.`,
      expiresAt: verification.expiresAt.toISOString(),
    });
    /////////////////////////////
    //////////////////////////////
  } catch (error) {
    if (error instanceof Error) {
      // Handle expected errors gracefully with appropriate status codes
      if (
        error.message.includes("Please wait before requesting another code") ||
        error.message.includes("This email has not initiated a signup")
      ) {
        return res.status(400).json({ message: error.message });
      }

      // Log unexpected errors and return 500
      console.error("Unexpected error:", error);
      return res
        .status(500)
        .json({ message: "Internal server error generating code." });
    }

    // Fallback for unknown error types
    return res.status(500).json({ message: "Unknown error occurred." });
  }
};

