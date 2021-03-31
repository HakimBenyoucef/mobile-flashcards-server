const mongoose = require("mongoose");

const { Schema } = mongoose;
const cardSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  duree: { type: Number /*required: true*/ },
  quizId: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
});

const cardModel = mongoose.model("Card", cardSchema);
module.exports = { cardModel, cardSchema };
