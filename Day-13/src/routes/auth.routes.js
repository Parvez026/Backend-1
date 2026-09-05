const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const crypto=require("crypto")

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User Already exist with this email",
    });
  }
 const hash=crypto.createHash("md5").update(password).digest("hex")
  const user = await userModel.create({
    name,
    email,
    password:hash,
  });

  //TOKEN
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Register successfully",
    user,
    token,
  });
});

authRouter.post("/protected", async (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "this is protected route",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user not found with this email",
    });
  }
  const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in succesfully ",
    user,
  });
});
module.exports = authRouter;
