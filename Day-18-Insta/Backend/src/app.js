const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
//require routes

const userRouter=require("./routes/user.routes")
const postRouter=require("./routes/post.routes")
const followRouter=require("./routes/follow.routes")

//Use routes

app.use("/api/auth",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/users/",followRouter)


module.exports=app