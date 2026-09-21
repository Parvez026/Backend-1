import express from "express";
import authRouter from "./routes/auth.routes.js";
const app=express()
import cookieParser from "cookie-parser";

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRouter)

export default app