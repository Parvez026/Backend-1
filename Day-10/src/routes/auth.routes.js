const express = require("express");
const userModel = require("../models/user.model");
const jwt=require("jsonwebtoken")

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isEmailAlreadyExist =await userModel.findOne({ email });
  if (isEmailAlreadyExist) {
    return res.status(409).json({
      message: "The user is already with this email",
    });
  }

  const user = await userModel.create({
    email,
    name,
    password,
  });
  const token=jwt.sign(
    {
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
  )
  res.cookie("jwt_token",token)
  res.status(201).json({
    message: "User registered successfully",
    user,
    token
  });
});

module.exports = authRouter;
