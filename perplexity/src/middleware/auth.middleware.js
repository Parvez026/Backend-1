import Jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorize",
      success: false,
      err: "token is not provided",
    });
  }

  try {
    let decoded = Jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
        message:"Unauthorize",
        success:false,
        err:"Invalid token"
    })
  }
}
