import { DB } from "./db.type.js";
import { Sequelize} from "sequelize";

const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  dialect: DB.DIALECT,
  host: DB.HOST,
  logging: DB.LOGGING,
  port: DB.PORT,
});

export default sequelize;
