import { isEmailUnique } from "../../../check_double/isEmailUnique.js";
import { z } from "zod";
import { RequestHandler } from "express";
import {formatZodErrors} from "../../../errors/formatErrors.error.js";
import { sendSignUpEmailVerification } from "../../../services/send_SignupEmailVerification.js";
import { generateSignUpEmailCode } from "../../../generator/generate.SignUpEmailCode.js";
import { emailConfirmEmailSchema } from "../../../validations/input_validation/inputFeildsValidation.js";
import { EmailVerification } from "./../../../models/zz.model.js";


type EmailInput = z.infer<typeof emailConfirmEmailSchema>;

export const signUp: RequestHandler = async (req, res) => {
  try {
    const result = emailConfirmEmailSchema.safeParse(req.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return res.status(400).json({ errors });
    }

    const userInput: EmailInput = result.data;
    const { email } = userInput;

    const emailTaken = !(await isEmailUnique(email));

    
    const verifiedEmail = await EmailVerification.findOne({
      where: { email, isVerified: true },
    });

    if (emailTaken && !verifiedEmail) {
      return res.status(409).json({ message: "Email already in use" });
    }

    req.session.email = email

    if (verifiedEmail) {
      return res.status(200).json({
        message:
          "Email already verified. You can continue to complete your signup.",
      });
    }

    // Generate 6 digits code
    const emailVerification = await generateSignUpEmailCode(email);

    // send code to email
    await sendSignUpEmailVerification(emailVerification.code, email);
    res.status(201).json({
      message: `An email has been sent to ${email} to continue your sign up.`,
      expiresAt: emailVerification.expiresAt.toISOString(),
    });
    /////////////////////////////
    /////////////////////////////
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
