import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";

configDotenv()

const app=express()
app.use(morgan('dev'))


app.get('/',(req,res)=>{
    console.log("Hello world")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

