const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");

const db = lowDb(new FileSync("db.json"));

db.defaults({ contacts: [] }).write();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

const PORT = 4000;

app.get("/contacts", (req, res) => {
  const data = db.get("contacts").value();
  console.log("data: " + JSON.stringify(data, undefined, 2));
  return res.json(data);
});

app.get("/contacts/:number", async (req, res) => {
  const contact = db.get("contacts").find({ number: req.params.number });
  console.log("contact: " + JSON.stringify(contact, undefined, 2));
  res.send(contact);
});

app.put("/contacts/:number", (req, res) => {
  const contact = db
    .get("contacts")
    .find({ number: req.params.number })
    .assign({ first: req.body.first, last: req.body.last })
    .value();
  db.write();
  console.log(contact);
  res.json({ success: true });
});

// A post will only create a contact if it finds a matching number
// This works fine for our example since we are updating existing contact records
app.post("/contacts", (req, res) => {
  console.log("POST /contacts: " + JSON.stringify(req.body, undefined, 2));
  const updateContact = db
    .get("contacts")
    .find({ number: req.body.number })
    // .assign({'number': req.body.number, 'first': req.body.first, 'last': req.body.last })
    .assign(req.body)
    .value();
  db.write();
  console.log("updateContact: " + JSON.stringify(updateContact, undefined, 2));
  res.json({ success: true });
});

// app.post("/contacts", (req, res) => {
//   const contact = req.body;
//   console.log("contact: " + JSON.stringify(contact, undefined, 2));
//   db.get("contacts")
//   .push({ ...contact })
//   .write();
//   res.json({ success: true });
// });

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
