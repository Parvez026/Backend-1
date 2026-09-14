const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User id is required"]
    },
    image_url:{
        type:String,
        require:[true,"Image url is required"]
    },
    caption:{
        type:String,
        default:""
    }
});

const postModel=mongoose.model("posts",postSchema)

module.exports=postModel