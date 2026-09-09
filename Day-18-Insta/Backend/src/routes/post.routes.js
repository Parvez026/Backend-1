const express=require("express")
const postRouter=express.Router()
const postController=require("../controller/post.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const identifyUser=require("../middlewares/auth.middlewares")

//POST/api/posts/
//CRETAING POST
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

//GET/api/posts/
//GET POST
postRouter.get("/",identifyUser,postController.fetchPostController)

//GET/api/posts/:details
//GET POST DETAIL
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailController)

//post/api/posts/like/:postId
//LIKE POST
postRouter.post("/likes/:postId",identifyUser,postController.likePostController)


module.exports=postRouter