const redis = require("../config/cache");
const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }
  const isTokenBlacklisted = await redis.get(token);
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  try {
    let dedoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = dedoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { authUser };
