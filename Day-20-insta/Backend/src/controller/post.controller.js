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
    folder: "Chohort-Insta",
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

async function getPostController(req, res) {
  const userId = req.user.id;
  const post = await postModel.find({ user: userId });

  res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

async function getPostDetailController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }
  res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

async function likePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  const like = await likeModel.create({
    post: postId,
    user: username,
  });
  res.status(201).json({
    message: "Post like successfully",
    like,
  });
}

async function unLikePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const isLike = await likeModel.findOne({
    post: postId,
    user: username,
  });
  if (!isLike) {
    return res.status(400).json({
      message: "Post dit't like",
    });
  }

  await likeModel.findByIdAndDelete({ _id: isLike._id });

  res.status(200).json({
    message: "Post unlike successfully",
  });
}

async function getFeedController(req, res) {
  const username = req.user.username;

  const posts = await Promise.all(
    (await postModel.find({}).populate("user").lean()).map(async (post) => {
      const isLike = await likeModel.findOne({
        user: username,
        post: post._id,
      });

      post.isLike = Boolean(isLike);

      return post;
    })
  );

  res.status(200).json({
    message: "Post get successfully",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  likePostController,
  unLikePostController,
  getFeedController,
};
