const mongoose = require("mongoose");
const cardSchema = require("./card");

const { Schema } = mongoose;

const quizSchema = new Schema({
    name: { type: String, required: true },
    cards: [cardSchema]
  });


module.exports = mongoose.model("Quiz", quizSchema);