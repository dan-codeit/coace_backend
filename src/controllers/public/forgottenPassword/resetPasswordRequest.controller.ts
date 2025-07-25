import { RequestHandler } from "express";
import { Parent, Student, PasswordReset } from "../../../models/zz.model.js";
import z from "zod";
import { oneEmailInputSchema } from "../../../validations/input_validation/oneEmailinput.validation.js";
import { formatZodErrors } from "../../../errors/formatErrors.error.js";
import { generate6DigitCode } from "../../../generator/generate.ResetCode.js";
import { sendEmailWithResetCode } from "../../../services/sendEmailWithResent.code.js";

type EmailInput = z.infer<typeof oneEmailInputSchema
>
export const sendPasswordResetCode: RequestHandler = async (req, res)=> {
    try {
        const result = oneEmailInputSchema.safeParse(req.body)

        if(!result.success){
            const errors = formatZodErrors(result.error)
           return res.status(400).json({errors})
        }

        const userInput: EmailInput = result.data
        const {email} = userInput

  const user = await Parent.findOne({ where: { email } }); 
  if (!user) {
    return res.status(404).json({ message: "No user found with this email" });
  }

  const code = generate6DigitCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  await PasswordReset.create({ email, code, expiresAt });

  // Send email
  await sendEmailWithResetCode(email, code);

  res.status(200).json({ message: "Password reset code sent to email" });

    } catch (error) {
        console.error("Error in sending password reset code", error)
        res.status(500).json({message: "Error in sending password reset code"})
    }
}