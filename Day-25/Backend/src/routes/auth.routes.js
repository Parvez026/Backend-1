const express=require("express")
const authController=require("../controllers/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")


const authRouter=express.Router()


authRouter.post("/register",authController.registerUser)

authRouter.post("/login",authController.loginUser)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

authRouter.get("/logout",authController.logoutUser)

module.exports=authRouter