const express=require("express")
const postRouter=express.Router()
const postController=require("../controller/post.controller")
const identifyUser = require("../middlewares/auth.middlewares")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})



//CREATE POST
//POST/api/posts/
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

//GET POST
//GET/api/posts/
postRouter.get("/",identifyUser,postController.getPostController)

//GET POST DETAIL
//GET/api/posts/:postId
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailController)

//POST LIKE
//POST/api/posts/likes/:postId
postRouter.post("/likes/:postId",identifyUser,postController.likePostController)

//POST UNLIKE
//POST/api/posts/unlikes/:postId
postRouter.post("/unlikes/:postId",identifyUser,postController.unLikePostController)
module.exports=postRouter

//GET FEED
//GET/api/posts/feed
postRouter.get("/feed",identifyUser,postController.getFeedController)