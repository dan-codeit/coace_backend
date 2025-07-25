import { Router } from "express";
import { updateUserPassword } from "../../controllers/private/updatePassword/updatePassword.controller.js";
import { logout } from "../../controllers/private/logout.controller.js";

const router = Router();

/////////private////////////
router.post("/update/password", updateUserPassword)
router.post("/logout", logout );

export {router as privateRoutes};
