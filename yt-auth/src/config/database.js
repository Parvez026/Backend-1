import mongoose from "mongoose";
import config from "./config.js";

async function connectToDb(){
   await mongoose.connect(config.MONGO_URI)

    console.log("Server connected to DB");
    
}

export default connectToDb