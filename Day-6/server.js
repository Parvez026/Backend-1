const app=require('./src/app')

const connectTodb=require('./src/config/Database')


connectTodb()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})