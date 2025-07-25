import { Router } from "express";
import { signUp } from "../../controllers/public/signupWithEmail/signup.Begin.controller.js";
import { verifySignUpEmail } from "../../controllers/public/signupWithEmail/verifySignUpEmail.controller.js";
import { resendEmailVerificationCode } from "../../controllers/public/signupWithEmail/resendEmailVerificationCode.controller.js";
import { completeSignup } from "../../controllers/public/signupWithEmail/signup.Complete.controller.js";
import { loginInUser } from "../../controllers/public/login/loginUser.controller.js";
import { sendPasswordResetCode } from "../../controllers/public/forgottenPassword/resetPasswordRequest.controller.js";
import { verifyPasswordEmailResetCode } from "../../controllers/public/forgottenPassword/verifyPassword.resetCode.controller.js";
import { completeResetPassword } from "../../controllers/public/forgottenPassword/reset.PasswordComplete.controller.js";
import { helloFromCoAce } from "../../controllers/test/test.config.js";

const router = Router();

//////// test route
router.get("/", helloFromCoAce)
/////////////

/////////////////
router.post("/signup", signUp);
router.post("/verify/signup-email", verifySignUpEmail);
router.post("/resend/signup/email-code", resendEmailVerificationCode);
router.post("/signup/complete", completeSignup);
router.post("/login", loginInUser);

///////////////Reset forgotten password
router.post("/forgotten/password", sendPasswordResetCode)
router.post("/verify/password-reset-code", verifyPasswordEmailResetCode )
router.post("/password/reset", completeResetPassword)



export { router as publicRoutes };
