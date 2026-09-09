const mongoose=require("mongoose")


const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"Image is required for creating post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User id is required"]
    }
})

const postModel=mongoose.model("posts",postSchema)

module.exports=postModel