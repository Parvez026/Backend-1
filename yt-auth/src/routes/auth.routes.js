import {Router} from "express";
import *as authController from "../controller/auth.controller.js";
const authRouter=Router()



authRouter.post("/register",authController.registerUser)

authRouter.get("/get-me",authController.getMe)

authRouter.get("/refresh-token",authController.refreshToken)

authRouter.get("/logout",authController.logoutUser)

export default authRouter