import cron from "node-cron";
import { cleanupUnverifiedUsersAcrossModels, cleanupUnverifiedEmailVerifications } from "../cleaners/clean.UnverififiedEmail.js";

export function startCronJobs() {
   //For development, every 1 minutes:
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running cleanup job...");
    try {
      await cleanupUnverifiedEmailVerifications();
      await cleanupUnverifiedUsersAcrossModels();
    } catch (err) {
      console.error("Error running cleanup job:", err);
    }
  });
}