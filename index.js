const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");

const db = lowDb(new FileSync("db.json"));

db.defaults({ contacts: [] }).write();

// Reset db on initialization
// db.get("contacts").remove().write();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

const PORT = 4000;

app.get("/reset", (req, res) => {
  db.get("contacts").remove().write();
  return res.send("db deleted");
});

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

// app.put("/contacts/:number", (req, res) => {
//   const contact = db
//     .get("contacts")
//     .find({ number: req.params.number })
//     .assign({ first: req.body.first, last: req.body.last })
//     .value();
//   db.write();
//   console.log(contact);
//   res.json({ success: true });
// });

app.post("/contacts", (req, res) => {
  const contact = req.body;
  console.log("contact: " + JSON.stringify(contact, undefined, 2));
  db.get("contacts")
    .push({ ...contact })
    .write();
  res.json({ success: true });
});

// // ACK WEBHOOK
// // Acknowledge webhooks from twilio or new Kafka server but don't process them
// app.post(/\/(twilio|new)/, (req, res, next) => {
//   console.log("ACK WEBHOOK");
//   res.sendStatus(200);
// });

// WEBHOOKS
app.post("/send", (req, res, next) => {
  console.log("SEND WEBHOOK");
  console.log(JSON.stringify(req.body, undefined, 2));
  // let zo_sent_at = req.body.dateCreated;
  // console.log("zo_sent_at: " + zo_sent_at);
  // zo_sent_at = Date.parse(zo_sent_at);
  // console.log("zo_sent_at: " + zo_sent_at);
  let number = req.body.finalDestination;
  console.log("number: " + number);
  let statusCode = req.body.statusCode;
  console.log("statusCode: " + statusCode);

  // Update matching contact
  const contact = db
    .get("contacts")
    .find({ number: number })
    .assign({
      // zo_sent_at: zo_sent_at,
      sent: statusCode,
    })
    // .assign(req.body)
    .value();
  // db.write();
  res.sendStatus(200);
});

app.post("/progress", (req, res, next) => {
  console.log("PROGRESS WEBHOOK");
  console.log(JSON.stringify(req.body, undefined, 2));
  // let zo_delivered_at = req.body.dateDelivered;
  // console.log("zo_delivered_at: " + zo_delivered_at);
  // zo_delivered_at = Date.parse(zo_delivered_at);
  // console.log("zo_delivered_at: " + zo_delivered_at);
  let number = req.body.finalDestination;
  console.log("number: " + number);
  let statusCode = req.body.statusCode;
  console.log("statusCode: " + statusCode);

  // Update matching contact
  const contact = db
    .get("contacts")
    .find({ number: number })
    .assign({
      // zo_delivered_at: zo_delivered_at,
      delivered: statusCode,
    })
    // .assign(req.body)
    .value();
  // db.write();
  res.sendStatus(200);
});

app.post("/receive", (req, res, next) => {
  console.log("RECEIVE WEBHOOK");
  console.log(JSON.stringify(req.body, undefined, 2));
  // let mo_received_at = req.body.dateCreated;
  // console.log("mo_received_at: " + mo_received_at);
  // mo_received_at = Date.parse(mo_received_at);
  // console.log("mo_received_at: " + mo_received_at);
  let number = req.body.finalSource;
  console.log("number: " + number);

  // Update matching contact
  const contact = db
    .get("contacts")
    .find({ number: number })
    .assign({
      // mo_received_at: mo_received_at,
      response: true,
    })
    // .assign(req.body)
    .value();
  // db.write();
  res.sendStatus(200);
});

app.post("/stop", (req, res, next) => {
  console.log("STOP WEBHOOK");
  console.log(JSON.stringify(req.body, undefined, 2));
  let number = req.body.finalSource;
  console.log("number: " + number);
  // Update matching contact
  const contact = db
    .get("contacts")
    .find({ number: number })
    .assign({
      optout: true,
    })
    .value();
  // db.write();
  res.sendStatus(200);
});

// ACK WEBHOOK
// Catchall to acknowledge webhooks that don't match the paths above
app.post(/.*/, (req, res, next) => {
  console.log("ACK WEBHOOK");
  res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
