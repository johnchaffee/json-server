const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");

const db = lowDb(new FileSync("db.json"));

db.defaults({ notes: [] }).write();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

const PORT = 4000;

app.get("/notes", (req, res) => {
  const data = db.get("notes").value();
  console.log("data: " + JSON.stringify(data, undefined, 2));
  return res.json(data);
});

app.get("/notes/:id", async (req, res) => {
  const note = db.get("notes").find((n) => n.id === req.params.id);
  console.log("note: " + JSON.stringify(note, undefined, 2));
  res.send(note);
});

app.put("/notes/:id", (req, res) => {
  const note = db.get('notes')
  .find({ id: req.params.id }) // Lodash shorthand syntax
  .assign({'text': req.body.text})
  .value()
  db.write()
  console.log(note)
  res.json({ success: true });
});

app.post("/notes", (req, res) => {
  const note = req.body;
  console.log("note: " + JSON.stringify(note, undefined, 2));
  console.log("note.text: " + note.text);
  db.get("notes")
    .push({ ...note, id: nanoid() })
    .write();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
