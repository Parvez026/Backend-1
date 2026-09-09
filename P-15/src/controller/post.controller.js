const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
async function createPostController(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not provided,Unauthorize access",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "User not authorize",
    });
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Cohort-2-insta-clone-post",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    image_url: file.url,
    user: decoded.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not Provided,Unauthorize access",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      Message: "Token Invalid",
    });
  }

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId,
  });
  res.status(200).json({
    message: "Post fetch successfully",
    posts,
  });
}

async function getPostDetailController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not provided",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorize access",
    });
  }

  const userId = decoded.id;
  const postId=req.params.postId

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
    message:"Post fetch successfully",
    post
 })

}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
};
