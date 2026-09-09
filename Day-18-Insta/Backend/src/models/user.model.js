const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:"default-avatar-profile-icon-vector-social-media-user-image-182145777.webp"
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel