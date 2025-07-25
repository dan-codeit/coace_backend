import { RequestHandler } from "express";
import { Admin } from "../../models/zz.model.js";

export const adminDashboard: RequestHandler = async (req, res) => {
try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Fetch admin data
      const admin = await Admin.findByPk(req.session.userId, {
        attributes: ["email", "role", "isEmailVerified"],
      });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.status(200).json(admin);
} catch (error) {
    console.error("Error in accessing dashboard", error)
    res.status(500).json({message: "Error in accessing dashboard."})
}
};
