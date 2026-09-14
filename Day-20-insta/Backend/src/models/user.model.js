const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"username should be unique"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"email should be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    bio:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:"default-image.jpg"
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel