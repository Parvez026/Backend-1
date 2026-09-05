const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username already exists"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"]
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

const userModel=mongoose.model("user",userSchema)

module.exports=userModel