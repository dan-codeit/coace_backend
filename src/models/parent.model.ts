import { DataTypes } from "sequelize";
import sequelize from "../config/db_set.js";
import { UserRoles } from "./user.roles.enum.js";
import { BaseModel } from "./base.model.js";
import { hashPassword } from "../redefine/hashPassword.js";

class Parent extends BaseModel<Parent> {
  declare userName?: string;
  declare email: string;
  declare password: string;
  declare isEmailVerified?: boolean;
  declare role: UserRoles | null;
}

Parent.init(
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
    //   allowNull: true,
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
    modelName: "Parent",
    tableName: "parents",
    timestamps: true,
    hooks: {
      beforeSave: hashPassword,
      
    },
  }
);

export default Parent;
