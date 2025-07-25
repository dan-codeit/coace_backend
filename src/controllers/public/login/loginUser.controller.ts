import z from "zod";
import { Parent, Student } from "../../../models/zz.model.js";
import { RequestHandler } from "express";
import { loginSchema } from "../../../validations/authInput.validation/auth_input_validation.js";
import {formatZodErrors} from "../../../errors/formatErrors.error.js";
import { checkPassword } from "../../../validations/comparePassw/checkPassword.js";
import { UserRoles } from "../../../models/user.roles.enum.js";

type AuthUser = {
  id: number;
  email: string;
  password: string;
  role: string;
};

type LoginInput = z.infer<typeof loginSchema>;

export const loginInUser: RequestHandler = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return res.status(400).json({ errors });
    }

    const userInput: LoginInput = result.data;
    const { email, password } = userInput;

    let user = (await Parent.findOne({
      where: { email },
    })) as AuthUser | null;

    if (!user) {
      user = (await Student.findOne({ where: { email } })) as AuthUser | null;
    }

    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // console.log("Logging in user...");
    // console.log("Input password:", password);
    // console.log("DB user object:", user);

    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

 req.session.userId = user.id;
 req.session.role = user.role as UserRoles;
    // Response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error is loggin users", error);
    res.status(500).json({ message: "Error in logging in." });
  }
};
