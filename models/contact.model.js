const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    id: Number,
    first_name: String,
    last_name: String,
    phone: String,
  },
  {
    versionKey: false,
  }
);

const ContactModel = model("contact", contactSchema);

module.exports = ContactModel;
