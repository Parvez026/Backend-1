const mongoose=require("mongoose")

function connectTodb(){
    mongoose.connect("mongodb+srv://parvezalam54802_db_user:Adr0Ta5sv5IJvcix@cluster0.qayvdnb.mongodb.net/day-6")

    .then(()=>{
        console.log("Connected to Database");
        
    })
}

module.exports=connectTodb