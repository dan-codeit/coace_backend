import { Request, Response, NextFunction } from "express";

import {Admin, Parent, Student, Teacher} from './../../models/zz.model.js';

/**
 * Middleware to protect routes and optionally restrict by user role(s)
 * Also checks if the user's email is verified.
 * @param allowedRoles Optional: pass one or more roles that are allowed
 */
export function authorizeUsers(...allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId, role } = req.session;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: not logged in" });
    }

    // Check role authorization
    if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    // Check email verification status
    try {
      // Fetch user from all possible user models
      const user =
        (await Parent.findByPk(userId)) ||
        (await Student.findByPk(userId)) ||
        (await Teacher.findByPk(userId)) ||
        (await Admin.findByPk(userId));

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: user not found" });
      }

      if (!user.isEmailVerified) {
        return res.status(403).json({
          message: "Forbidden: email not verified. Please verify your email.",
        });
      }

      next();
    } catch (error) {
      console.error("Authorization middleware error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
