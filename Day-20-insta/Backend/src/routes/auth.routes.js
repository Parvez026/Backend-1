const express=require("express")
const authController=require("../controller/auth.controller")
const authRouter=express.Router()


//REGISTER
//POST/api/auth/register

authRouter.post("/register",authController.registerController)

//LOGIN
//POST/api/auth/register
authRouter.post("/login",authController.loginController)

module.exports=authRouter