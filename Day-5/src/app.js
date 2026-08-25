const express=require("express")

const app=express()
const notes=[]

app.use(express.json())

app.post('/notes',(req,res)=>{
    notes.push(req.body)

    res.status(201).json({
        message:"note create successfully"
    })
})

app.get('/notes',(req,res)=>{
 res.status(200).json({
    notes:notes
 })
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message:"note deleted"
    })
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].title=req.body.title

    res.status(200).json({
        message:"note update successfully"
    })
})


module.exports=app