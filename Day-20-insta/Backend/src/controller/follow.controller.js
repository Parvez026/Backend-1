const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "Followee does't exist",
    });
  }
  const follow = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });
  res.status(201).json({
    message: "Successfully follow",
    follow,
  });
}

async function unFollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFollow=await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
  })
  if(!isFollow){
    return res.status(200).json({
        message:"you are not follow"
    })
  }
 
  await followModel.findByIdAndDelete(isFollow._id)
  res.status(200).json({
    message:"You are successfully unfollow"
  })
}

module.exports = {
  followUserController,
  unFollowUserController,
};
