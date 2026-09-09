const mongoose=require("mongoose")


const postSchema=new mongoose.Schema({
    image_url:{
        type:String,
        require:[true,"Image is required"]
    },
    caption:{
        type:String,
        default:""
    },
    user:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User id is required"]
    }

})

const postModel=mongoose.model("posts",postSchema)

module.exports=postModel