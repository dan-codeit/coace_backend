import { Router } from "express";
import { authorizeUsers } from "../../middlewares/who2/authenticate.middleware.js";
import { studentDashboard } from "../../controllers/student/studentDashBoard.controller.js";


const router = Router()

const authorize = [authorizeUsers("student")]
router.use(authorize)

router.get("/dashboard", studentDashboard)

export { router as studentRoutes };