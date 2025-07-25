import { Router } from "express";
import { authorizeUsers } from "../../middlewares/who2/authenticate.middleware.js";
import { adminDashboard } from "../../controllers/admin/admin.dashBoard.controller.js";


const router = Router()

const authorize = [authorizeUsers("admin")]
router.use(authorize)

router.get("/dashboard",adminDashboard)

export { router as adminRoutes };