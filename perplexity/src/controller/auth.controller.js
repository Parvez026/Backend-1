import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  console.log("REGISTER START");

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User with this email or username already exists",
      success: false,
      err: "User already exists",
    });
  }

  const user = new userModel({
    username,
    email,
    password,
  });
  await user.save();

  await sendEmail({
  to: email,
  subject: "Welcome to Our App!",
  html: `<h1>Welcome, ${username}!</h1><p>Thank you for registering with our app.</p>`,
  text: `Welcome, ${username}! Thank you for registering with our app.`,
});

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
