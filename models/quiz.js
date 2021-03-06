const mongoose = require("mongoose");
const card = require("./card");

const { Schema } = mongoose;

const quizSchema = new Schema({
    name: { type: String, required: true },
    cards: [card.cardSchema]
  });


module.exports = mongoose.model("Quiz", quizSchema);