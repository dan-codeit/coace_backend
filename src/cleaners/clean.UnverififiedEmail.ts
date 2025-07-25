import { EmailVerification, Student, Parent, Teacher, Admin } from "../models/zz.model.js";
import { Op } from "sequelize";

export async function cleanupUnverifiedEmailVerifications() {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
  //const cutoff = new Date(Date.now() - 1 * 60 * 1000);

  const deletedCount = await EmailVerification.destroy({
    where: {
      isVerified: true,
      createdAt: { [Op.lt]: cutoff },
    },
  });

  console.log(`Deleted ${deletedCount} unverified email verification records.`);
}



const userModels = [
  { model: Parent, name: "Parent" },
  { model: Student, name: "Student" },
  { model: Teacher, name: "Teacher" },
  { model: Admin, name: "Admin" },
];

/**
 * Deletes isEmailVerified users created before a cutoff date from all models
 */
export async function cleanupUnverifiedUsersAcrossModels() {
  //const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const cutoff = new Date(Date.now() - 1 * 60 * 1000);

  for (const { model, name } of userModels) {
    const deletedCount = await model.destroy({
      where: {
        isEmailVerified: false,
        createdAt: { [Op.lt]: cutoff },
      },
    });

    console.log(`Deleted ${deletedCount} unverified ${name} records.`);
  }
}