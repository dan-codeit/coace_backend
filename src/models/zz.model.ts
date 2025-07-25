import Admin from "./admin.model.js";
import Teacher from "./teacher.model.js";
import Parent from "./parent.model.js";
import Student from "./student.model.js";
import EmailVerification from './emailVerification.js';
import { normalizeEmailAndRoleHook } from "../hooks/lowerCasesStreet.js";
import PasswordReset from "./passwordReset.model.js";
//
//
//
///
///
///
EmailVerification.beforeSave(normalizeEmailAndRoleHook);
Teacher.beforeSave(normalizeEmailAndRoleHook);
Student.beforeSave(normalizeEmailAndRoleHook);
Parent.beforeSave(normalizeEmailAndRoleHook);
//
//
export {Admin, Teacher, Parent, Student, EmailVerification, PasswordReset}