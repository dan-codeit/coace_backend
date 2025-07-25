import { Dialect } from "sequelize";
import dotenv from "dotenv";
///////////////////
///////////////////
export type DBConfig = {
  NAME: string;
  USER: string;
  PASSWORD: string;
  DIALECT: Dialect;
  LOGGING: boolean;
  HOST: string;
  PORT: number;
};
/////////////////////
/////////////////////
dotenv.config();
//////////////////////
export const DB: DBConfig = {
  NAME: process.env.DB_NAME || "",
  USER: process.env.DB_USER || "",
  PASSWORD: process.env.DB_PASSWORD || "",
  DIALECT: process.env.DB_DIALECT as Dialect,
  LOGGING: process.env.DB_LOGGING === "true",
  HOST: process.env.DB_HOST || "localhost",
  PORT: parseInt(process.env.DB_PORT || "3307", 10),
};