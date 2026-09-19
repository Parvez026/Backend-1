const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"userename must be unique"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel
