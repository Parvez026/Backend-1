const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");



const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {


  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-insta-post",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: req.user.id
  });

  res.status(201).json({
    message:"Post created successfully",
    post
  })
}

async function getPostController(req,res){
   

    const userId=req.user.id
    const post=await postModel.find({
        user:userId
    })
    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    res.status(200).json({
        message:"Post fetched successfully",
        post
    })
}

async function postDetailController(req,res){
 
    const userId=req.user.id;
    const postId=req.params.postId;

    const post=await postModel.findById(postId)

    if(!post){
      return res.status(404).json({
        message:"Post not found"
      })
    }

    const isValidUser=post.user.toString()===userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden content"
        })
    }
    res.status(200).json({
        message:"Post fetched successfully",
        post
    })
}

async function postLikeController(req,res){
   
  const postId=req.params.postId
  const username=req.user.username

  const post=await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"Post not exist"
    })
  }
  const isAlreadyLike=await likeModel.findOne({
    post:postId,
    user:username
  })

  if(isAlreadyLike){
    return res.status(200).json({
      message:"Your already like this post"
    })
  }

  const like=await likeModel.create({
    post:postId,
    user:username
  })

  res.status(200).json({
    message:"Post like successfully",
    like
  })
}
module.exports = {
  createPostController,
  getPostController,
  postDetailController,
  postLikeController
};
