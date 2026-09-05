const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "this email is already exist"],
  },
  password: String,
});

const userModel=new mongoose.model("users",userSchema)

module.exports=userModel
