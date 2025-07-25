import { Model } from "sequelize";
import { UserRoles } from "../models/user.roles.enum.js";

export function normalizeEmailAndRoleHook(
  record: Model & { email?: string; role?: UserRoles | string | null }
) {
  if (record.email) {
    record.email = record.email.toLowerCase().trim();
  }

  if (typeof record.role === "string") {
    record.role = record.role.toLowerCase().trim() as UserRoles;
  }
}
