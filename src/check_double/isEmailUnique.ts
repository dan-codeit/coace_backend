import {Parent, Teacher, Admin, Student} from "../models/zz.model.js"

export const isEmailUnique = async (email: string): Promise<boolean> => {
  try {
    const [teacher, parent, student, admin] = await Promise.all([
      Teacher.findOne({ where: { email } }),
      Parent.findOne({ where: { email } }),
      Student.findOne({ where: { email } }),
      Admin.findOne({ where: { email } }),
    ]);

    return !(teacher || parent || student || admin);
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    throw new Error("Internal error while checking email uniqueness");
  }
};
