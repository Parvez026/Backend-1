const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis=require("../config/cache")

async function registerController(req, res) {
  const { username, password, email } = req.body;

  const isUserAlreadyRegister = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserAlreadyRegister) {
    return res.status(400).json({
      message: "User with the same email or username already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [
        {
          email,
        },
        {
          username,
        },
      ],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid cradintials",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
}

async function logoutController(req,res){
    const token=req.cookies.token
    
    res.clearCookie("token")
    await redis.set(token,Date.now().toString(),"EX",60*60)

    res.status(200).json({
        message:" logout successfully"
    })

}
module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController
};
