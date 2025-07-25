import { EmailVerification } from "../models/zz.model.js";
import { Op } from "sequelize";

export const generateSignUpEmailCode = async (email: string) => {
  try {
    const now = new Date();

    // Remove expired codes for this email
    await EmailVerification.destroy({
      where: {
        email,
        expiresAt: { [Op.lt]: now },
      },
    });

    let record = await EmailVerification.findOne({ where: { email } });

    if (!record) {
      // No existing record — create a new code and record
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); 
      record = await EmailVerification.create({
        email,
        code,
        expiresAt,
        isVerified: false,
      });
      return record;
    }

    
    // No Generating new code if less than 60s since last creation
    if (
      record.createdAt &&
      record.createdAt.getTime() > now.getTime() - 60 * 1000
    ) {
      throw new Error("Please wait before requesting another code.");
    }

    // If current code is still valid (not expired), return existing record (no new code generated)
    if (record.expiresAt && record.expiresAt > now) {
      return record;
    }

    // Otherwise, generate a new code and update expiry
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

    await record.update({ code, expiresAt });

    return record;
  } catch (error) {
    if (error instanceof Error) {
      const expectedMessages = ["Please wait before requesting another code."];

      const isExpected = expectedMessages.some((msg) =>
        error.message.includes(msg)
      );

      if (!isExpected) {
        console.error("Unexpected error in generateSignUpEmailCode:", error);
      } else {
        console.log(
          "Expected error in generateSignUpEmailCode:",
          error.message
        );
      }

      throw error;
    } else {
      console.error("Unknown error in generateSignUpEmailCode:", error);
      throw new Error("Could not generate or resend verification code.");
    }
  }
};
