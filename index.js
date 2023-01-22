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
  try {
    let contacts = await ContactModel.find();
    res.send(contacts);
  } catch (err) {
    res.send(err);
  }
});

// get single contact
app.get("/contacts/:id/:name", async (req, res) => {
  try {
    let { id } = req.params;
    let contact = await ContactModel.findOne({ id: Number(id) });
    res.send(contact);
  } catch (err) {
    res.send(err);
  }
});

// get all messages from db
app.get("/messages", async (req, res) => {
  await Message.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
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
      res.status(403).send("failed to store message", err);
    });
});

// after mongodb is connected start the server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
    app.listen(process.env.PORT, () => {
      console.log("server running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
