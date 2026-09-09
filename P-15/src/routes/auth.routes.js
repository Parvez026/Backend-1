const express = require("express");
const authController=require("../controller/auth.controller")


const authRouter = express.Router();

//REGISTER

authRouter.post("/register",authController.registerController);

//LOGIN

authRouter.post("/login",authController.loginController );

module.exports = authRouter;
