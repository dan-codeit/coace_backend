import { isEmailUnique } from "../../../check_double/isEmailUnique.js";
import { z } from "zod";
import { RequestHandler } from "express";
import {
  EmailVerification,
  Student,
  Parent,
} from "../../../models/zz.model.js";
import { formatZodErrors } from "../../../errors/formatErrors.error.js";
import { fullParentStudentRegistrationSchema } from "../../../validations/input_validation/fullParentStudentRegInput.js";
import { UserRoles } from "../../../models/user.roles.enum.js";

type RolePasswordInput = z.infer<typeof fullParentStudentRegistrationSchema>;

export const completeSignup: RequestHandler = async (req, res) => {
  try {
    const result = fullParentStudentRegistrationSchema.safeParse(req.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return res.status(400).json({ errors });
    }

    const userInput: RolePasswordInput = result.data;
    const { email } = req.session;
    const { role, password } = userInput;

    if (!email) {
      return res.status(400).json({
        message: "Email not found in session. Please verify email first.",
      });
    }

    // Check if email is already taken in your user tables
    const emailTaken = !(await isEmailUnique(email));
    if (emailTaken) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Verify email confirmation record
    const verification = await EmailVerification.findOne({
      where: { email, isVerified: true },
    });
    if (!verification) {
      return res.status(400).json({ message: "Email not verified." });
    }

    // Create user by role
    let newUser;
    if (role === UserRoles.Parent) {
      newUser = await Parent.create({
        email,
        role: UserRoles.Parent,
        password,
      });
    } else if (role === UserRoles.Student) {
      newUser = await Student.create({
        email,
        role: UserRoles.Student,
        password,
      });
    } else {
      return res.status(400).json({ message: "Unsupported role" });
    }

    // Mark email verified in user model
    newUser.isEmailVerified = true;
    await newUser.save();

    // Clear email from session & delete verification record
    req.session.email = undefined;
    await EmailVerification.destroy({ where: { email } });

    res.status(201).json({
      message: `Signup successful! Your account for ${email} has been created as a ${role}. You can now log in.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

