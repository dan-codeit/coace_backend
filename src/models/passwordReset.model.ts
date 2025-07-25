
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db_set.js";

export class PasswordReset extends Model {
  declare email: string;
  declare code: string;
  declare expiresAt: Date;
  declare isUsed: boolean;
}

PasswordReset.init(
  {
    email: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
    isUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "PasswordReset",
    tableName: "password_resets",
    timestamps: true,
  }
);

export default PasswordReset