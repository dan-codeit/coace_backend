import { Router } from "express";
import { authorizeUsers } from "../../middlewares/who2/authenticate.middleware.js";
import { parentDashboard } from "../../controllers/parent/parentDashboard.controller.js";

const router = Router()

const authorize = [authorizeUsers("parent")]
router.use(authorize)

router.get("/dashboard",parentDashboard)

export { router as parentRoutes };