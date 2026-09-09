const express=require("express")
const userRouter=express.Router()
const userContoller=require("../controller/user.controller")


//POST/api/auth/register
//REGISTER
userRouter.post("/register",userContoller.userRegisterController)

//POST/api/auth/login
//LOGIN
userRouter.post("/login",userContoller.userLoginController)


module.exports=userRouter