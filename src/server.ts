import { connection } from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/db_set.js";
import { startCronJobs } from "./automation/crawl.js";

dotenv.config({ quiet: true });

const PORT = process.env.PORT;
//////////////////////
//////////////////////
//////////////////////
const startUp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database is connected");

    await sequelize.sync({ alter: true });
    console.log("Database synched");

    connection.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
    
    startCronJobs()
  } catch (error) {
    console.error("Error in starting server", error)
  }
};

startUp();
