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
      message: "User you are trying to follow does not exist",
    });
  }

  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "You cantnot follow yourself",
    });
  }
  const isAlreadyFollow = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isAlreadyFollow) {
    return res.status(409).json({
      message: `You are already follow ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });
  res.status(201).json({
    message: `You are now follow ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUsercontroller(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFollow = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });

  if (!isFollow) {
    return res.status(400).json({
      message: `You are not follow ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isFollow._id);

  res.status(200).json({
    message: `You are unfollow ${followeeUsername}`,
  });
}

async function updateFollowController(req, res) {
  const followId = req.params.followId;
  const status = req.body.status;

  if (!["pending", "accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Status must be accepted or rejected",
    });
  }

  const followRequest = await followModel.findById(followId);

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }
  if (followRequest.followee !== req.user.username) {
    return res.status(403).json({
      message: "You cannot upadate this Follow Request",
    });
  }
  followRequest.status = status;
  await followRequest.save();

  res.status(200).json({
    message: `Follow request ${status}`,
    follow: followRequest,
  });
}
module.exports = {
  followUserController,
  unfollowUsercontroller,
  updateFollowController,
};
