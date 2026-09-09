const express=require("express")
const identifyUser = require("../middlewares/auth.middleware")
const userController=require("../controller/user.controller")
const userRouter=express.Router()


//POST/api/users/follow/:username
//Follow

userRouter.post("/follow/:username",identifyUser,userController.followUserController)

//POST/api/users/unfollow/:username
//UNFOLLOW

userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

//PATCH/api/users/update/:followId
//UPDATE FOLLOW STATUS

userRouter.patch("/follow/:followId",identifyUser,userController.updateFollowStatusController)



module.exports=userRouter