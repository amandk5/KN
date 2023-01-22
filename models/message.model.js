const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    refid: String,
    name: String,
    message: String,
    phone: Number,
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const MessageModel = model("message", messageSchema);

module.exports = MessageModel;
