import { RequestHandler } from "express";
import { Student } from "../../models/zz.model.js";
 

export const studentDashboard: RequestHandler = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch student data
    const student = await Student.findByPk(req.session.userId, {
      attributes: ["email", "role", "isEmailVerified"],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error in accessing dashboard", error);
    res.status(500).json({ message: "Error in accessing dashboard." });
  }
};
