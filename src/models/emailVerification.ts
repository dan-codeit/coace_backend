import { DataTypes } from "sequelize";
import sequelize from "../config/db_set.js";
import { BaseModel } from "./base.model.js";

class EmailVerification extends BaseModel<EmailVerification> {
  declare email: string;
  declare code: string;
  declare expiresAt: Date;
  declare isVerified: boolean;
}

EmailVerification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "EmailVerification",
    tableName: "email_verifications",
    timestamps: true,
    indexes: [
      {
        fields: ["email"],
      },
    ],
  }
);


export default EmailVerification;
