const express=require("express")
const userRouter=express.Router()
const userContoller=require("../controller/user.controller")
const identifyUser=require("../middlewares/auth.middlewares")



//POST/api/auth/register
//REGISTER
userRouter.post("/register",userContoller.userRegisterController)

//POST/api/auth/login
//LOGIN
userRouter.post("/login",userContoller.userLoginController)


//GET/api/auth/get-me

userRouter.get("/get-me",identifyUser,userContoller.getMeController)


module.exports=userRouter