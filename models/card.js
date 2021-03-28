const mongoose = require("mongoose");

const { Schema } = mongoose;
const cardSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Card", cardSchema);
module.exports = cardSchema;
