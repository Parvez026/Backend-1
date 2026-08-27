const express = require("express");
const noteModel = require("./models/note.model");
const cors=require("cors")

const app = express();
app.use(cors())
app.use(express.json());

// POST

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

// GET
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

// DELETE

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Note delete sccessfully",
  });
});

// PATCH
app.patch("/api/notes/:id",async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  await noteModel.findByIdAndUpdate(id, { title });
  res.status(200).json({
    message: "Note modified successfully",
  });
});
module.exports = app;
