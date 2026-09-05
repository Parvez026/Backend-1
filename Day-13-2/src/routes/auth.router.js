const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const authRouter = express.Router();

//REGISTER

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(409).json({
      message: "User already exist",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "user register successfully",
    user,
  });
});

//GET USER

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;
  

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);
  res.json({
    name:user.name,
    email:user.email
  });
});

//LOGIN

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "use not found",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");
  if (hash !== user.password) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "login successfully",
    user,
  });
});

module.exports = authRouter;
