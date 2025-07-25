import { RequestHandler } from "express";
import {Parent} from "../../models/zz.model.js";


export const parentDashboard: RequestHandler = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch parent data
    const parent = await Parent.findByPk(req.session.userId, {
      attributes: ["email", "role", "isEmailVerified"],
    });

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.status(200).json(parent);
  } catch (error) {
     console.error("Error in accessing dashboard", error);
     res.status(500).json({ message: "Error in accessing dashboard." });
  }
};


