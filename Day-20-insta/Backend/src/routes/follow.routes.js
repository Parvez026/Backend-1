const express=require("express")
const identifyUser = require("../middlewares/auth.middlewares")
const followRouter=express.Router()
const followController=require("../controller/follow.controller")


//FOLLOW
//POST/api/users/follow/:username
followRouter.post("/follow/:username",identifyUser,followController.followUserController)

//UNFOLLOW
//POST/api/users/unfollow/:username
followRouter.post("/unfollow/:username",identifyUser,followController.unFollowUserController)

module.exports=followRouter