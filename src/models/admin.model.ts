import { DataTypes } from "sequelize";
import sequelize from "../config/db_set.js";
import { UserRoles } from "./user.roles.enum.js";
import { BaseModel } from "./base.model.js";
import { hashPassword } from "../redefine/hashPassword.js";

class Admin extends BaseModel<Admin> {
  declare userName?: string;
  declare email: string;
  declare password: string;
  declare isEmailVerified: boolean;
  declare role: UserRoles | null;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // userName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRoles)),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: true,
    hooks: {
      beforeSave: hashPassword,
     
    },
  }
);

export default Admin;
