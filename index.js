require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ContactModel = require("./models/contact.model");
const Message = require("./models/message.model");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

// get all contacts from db
app.get("/contacts", async (req, res) => {
  let contacts = await ContactModel.find();
  res.send(contacts);
});

// get single contact
app.get("/contacts/:id/:name", async (req, res) => {
  let { id } = req.params;
  let contact = await ContactModel.findOne({ id: Number(id) });
  res.send(contact);
});

// get all messages from db
app.get("/messages", async (req, res) => {
  let messages = await Message.find();
  res.send(messages);
});

// send message route
app.post("/message/post", async (req, res) => {
  let { refid, name, message, phone } = req.body;

  let newMessage = new Message({
    refid: refid,
    name: name,
    message: message,
    phone: Number(phone),
  });

  await Message.create(newMessage)
    .then(() => res.status(201).send("message saved successfully"))
    .catch((err) => {
      res.status(403).send("failed to store message");
    });
});

// after mongodb is connected start the server
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("db connected");
  app.listen(process.env.PORT, () => {
    console.log("server running on port", process.env.PORT);
  });
});
