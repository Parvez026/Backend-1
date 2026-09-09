const express=require("express")
const identifyUser = require("../middlewares/auth.middlewares")
const followRouter=express.Router()
const followController=require("../controller/follow.controller")


//POST/api/users/follow/:username
//FOLLOW
followRouter.post("/follow/:username",identifyUser,followController.followUserController)

//POST /api/users/unfollow/:username
//UNFOLLOW
followRouter.post("/unfollow/:username",identifyUser,followController.unfollowUsercontroller)

//PATCH/api/users/update/:username
//UPDATE STATUS
followRouter.patch("/follow/:followId",identifyUser,followController.updateFollowController)

module.exports=followRouter