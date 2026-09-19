const express=require("express")
const authRouter=express.Router()
const authMiddleware=require("../middlewares/auth.middleware")
const authController=require("../controllers/auth.controller")




authRouter.post("/register",authController.registerController)

authRouter.post("/login",authController.loginController)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

authRouter.get("/logout",authController.logoutController)



module.exports=authRouter