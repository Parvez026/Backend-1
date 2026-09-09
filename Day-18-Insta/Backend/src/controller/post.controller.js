const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Insta-Clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    image_url: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function fetchPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  if (!posts) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.status(200).json({
    message: "Post fetched successfully",
    posts,
  });
}

async function getPostDetailController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }
  res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

async function likePostController(req, res) {
  const postId = req.params.postId;
  const username=req.user.username

  const post=await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
        message:"Post is not found"
    })
  }
//   const isAlreadyLike=await likeModel.findOne({
//     post:postId,
//     user:username
//   })
//   if(isAlreadyLike){
//     return res.status(409).json({
//         message:`You are already like ${username}`
//     })
//   }

  const like=await likeModel.create({
    post:postId,
    user:username
  })

  res.status(201).json({
    message:"Post like successfully",
    like
  })

}
module.exports = {
  createPostController,
  fetchPostController,
  getPostDetailController,
  likePostController
};
