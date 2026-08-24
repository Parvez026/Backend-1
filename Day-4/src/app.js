const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);

  res.send("notes created");
});
app.get("/notes", (req, res) => {
  res.send(notes);
});

/* params */
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("Notes deleted successfully");
});

/*PATCH/notes/:index */

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].discription = req.body.discription;

  res.send("Update successfully")
});

module.exports = app;
