const jwt = require("jsonwebtoken");
const redis=require("../config/cache")

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Tokemn is not provided",
    });
  }

  const isTokenisBlacklisted=await redis.get(token)
  if(isTokenisBlacklisted){
    return res.status(401).json({
        message:"Invalid token"
    })
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports={
    authUser
}
