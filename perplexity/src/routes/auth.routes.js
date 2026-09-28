import { Router } from "express";
import { getMe, login, register, verifyEmail } from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();


//Register
authRouter.post("/register", registerValidator, register);


//login
authRouter.post("/login",loginValidator,login)

//get-me
authRouter.get("/get-me",authUser,getMe)


//verify-email
authRouter.get("/verify-email",verifyEmail)





export default authRouter;
