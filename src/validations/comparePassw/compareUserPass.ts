import bcrypt from 'bcrypt';
import { checkPassword } from './checkPassword.js';
import { Student, Parent } from './../../models/zz.model.js';

export const updatePasswordForUsers = async (
  userId: number,
  newPassword: string
) => {
let user = await Parent.findOne({ where: { id: userId } });
console.log("Parent user lookup:", user ? "found" : "not found");

if (!user) {
  user = await Student.findOne({ where: { id: userId } });
  console.log("Student user lookup:", user ? "found" : "not found");
}

if (!user) {
  console.log("User not found for id:", userId);
  return { success: false, message: "User not found." };
}

  // ❗️ Do NOT assign user.password before this check!
  const isSamePassword = await checkPassword(newPassword, user.password);

console.log("Stored password:", user.password);
console.log("New password entered:", newPassword);
console.log("Password match:", isSamePassword);

  if (isSamePassword) {
    return {
      success: false,
      message: "New password must be different from the current one.",
    };
  }

  // ✅ Now assign and save — hook will hash it
  user.password = newPassword;
  user.changed('password', true); // ensures Sequelize sees it as updated
  await user.save();

  return { success: true };
};
