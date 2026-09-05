const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,'username already exitst']
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exist"]
    },
    bio:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    profilePic:{
        type:String,
        default:"default-avatar-profile-icon-vector-social-media-user-image-182145777.webp"
    }
})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel