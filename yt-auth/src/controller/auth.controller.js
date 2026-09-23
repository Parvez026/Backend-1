import config from "../config/config.js";
import userModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import sessionModel from "../models/session.model.js";

export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyRegistered) {
    return res.status(409).json({
      message: "User already registered",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  // const refreshTokenHash = await bcrypt.hash(refreshtoken, 10);

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  const accesstoken = jwt.sign(
    {
      id: user._id,
      sessionId: session.id,
    },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User Register successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accesstoken,
  });
}

export async function getMe(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "token not provided",
    });
  }

  let decoded = jwt.verify(token, config.JWT_SECRET);

  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message: "user fetched sucessfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh token not provided",
    });
  }

  let decoded = jwt.verify(refreshToken, config.JWT_SECRET);


  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

    const session = await sessionModel.findOne({
      user: decoded.id,
      refreshTokenHash,
      revoked: false,
    });


  if (!session) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  const user=await userModel.findById(session.user)

  const accesstoken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  res.status(201).json({
    message: "Access token generated successfully",
    accesstoken,
  });
}

export async function logoutUser(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh token not provided",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);


  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "User logged out successfully",
  });
}
