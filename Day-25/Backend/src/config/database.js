const mongoose=require("mongoose")

function connectedToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB");
        
    })
}


module.exports=connectedToDb