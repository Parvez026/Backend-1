const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerControler(req, res){
  const { username, email, password, bio, profilePic } = req.body;

  const isUserAlreasyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreasyExist) {
    return res.status(409).json({
      message:
        isUserAlreasyExist.email === email
          ? "email already exist"
          : "username already exist",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profilePic,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    },
  });
}


async function loginController(req, res){
  const { username, password, email } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
       username:username,
      },
      {
        email:email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
        message:"user not found"
    })
  }

  const hash=crypto.createHash("sha256").update(password).digest("hex")

  const isValidPassword=hash==user.password

  if (!isValidPassword) {
    return res.status(401).json({
        message:"Invlaid password"
    })
  }

  const token=jwt.sign({
    id:user._id
  },
process.env.JWT_SECRET,{expiresIn:"1d"}
)
res.cookie("token",token)
res.status(200).json({
    message:"User loggedIn successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profile:user.profilePic
    }
})


}

module.exports={
    registerControler,loginController
}