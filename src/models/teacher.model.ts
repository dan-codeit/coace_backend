import { DataTypes } from "sequelize";
import sequelize from "../config/db_set.js";
import { UserRoles } from "./user.roles.enum.js";
import { BaseModel } from "./base.model.js";
import { hashPassword } from "../redefine/hashPassword.js";

class Teacher extends BaseModel<Teacher> {
  declare email: string;
  declare firstName?: string;
  declare password: string;
  declare isEmailVerified?: boolean;
  declare role: UserRoles | null;
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRoles)),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Teacher",
    tableName: "teachers",
    timestamps: true,
    hooks: {
      beforeSave: hashPassword,
    },
  }
);

export default Teacher;
