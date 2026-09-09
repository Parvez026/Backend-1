const followModel=require("../models/follow.model")
const userModel = require("../models/user.model")



async function followUserController(req,res){

    const followerUsername=req.user.username
    const followeeUsername=req.params.username

    if(followeeUsername===followerUsername){
        return res.status(200).json({
          message:"You cannot follow yourself"
        })
    }

    const isAlreadyFollow=await followModel.findOne({
        followee:followeeUsername,
        follower:followerUsername
    })

    if(isAlreadyFollow){
        return res.status(400).json({
            message:`You already follow ${followeeUsername}`
        })
    }

    const isFolloweeExist=await userModel.findOne({
        username:followeeUsername
    })

    if(!isFolloweeExist){
        return res.status(404).json({
            message:"Followee Not Found"
        })
    }

    const followRecord=await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        Message:`You Now follow ${followeeUsername}`,
        follow:followRecord
    })

}

async function unfollowUserController(req,res){

    const followerUsername=req.user.username
    const followeeUsername=req.params.username


    const isFollow=await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    if(!isFollow){
        return res.status(200).json({
            message:`You are not follow ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isFollow._id)

    res.status(200).json({
        message:`You have unfollow ${followeeUsername}`
    })
}

async function updateFollowStatusController(req,res){
  
    const followId=req.params.followId
    const status=req.body.status

    if(!["pending","accepted","rejected"].includes(status)){
        return res.status(400).json({
            message:"Status should be pending, accepted or rejected"
        })
    }

    const followRecord=await followModel.findById(followId)

    if(!followRecord){
        return res.status(404).json({
            message:"Follow record not found"
        })
    }

    if(followRecord.followee!==req.user.username){
        return res.status(403).json({
            message:"You are not authorized to update this follow request"
        })
    }


    followRecord.status=status
    await followRecord.save()

    res.status(200).json({
        message:"Follow status updated successfully",
        follow:followRecord
    })  
}


module.exports={
    followUserController,
    unfollowUserController,
    updateFollowStatusController
}