const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.static('./public'))
//POST
app.post("/api/notes", async (req, res) => {
  const { title, discription } = req.body;
  const note = await noteModel.create({
    title,
    discription,
  });
  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

//GET
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes Fetched successfully",
    notes,
  });
});

//DELETE
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note delete successfully",
  });
});

//PATCH
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  await noteModel.findByIdAndUpdate(id, { title });

  res.status(200).json({
    message: "Note Update successfully",
  });
});

module.exports = app;
