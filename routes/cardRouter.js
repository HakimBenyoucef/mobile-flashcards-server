const express = require("express");
const cardRouter = express.Router();

const Card = require("../models/card");

// Getting all
cardRouter.get("/", async (req, res) => {
  try {
    const cards = await Card.cardModel.find({});
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting one
cardRouter.get("/:id", getCard, (req, res) => {
  res.json(res.card);
});

// Creating one
cardRouter.post("/", async (req, res) => {
  const card = new Card.cardModel({
    question: req.body.question,
    answer: req.body.answer,
    duree: req.body.duree,
    quizId: req.body.quizId,
  });
  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// updating one
cardRouter.patch("/", (req, res) => {});

// deleting one
cardRouter.delete("/:id", getCard, async (req, res) => {
  try {
    await res.card.remove();
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getCard(req, res, next) {
  let card;
  try {
    card = await Card.cardModel.findById(req.params.id);
    if (card == null) {
      return res.status(404).json({ message: "Card not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.card = card;
  next();
}

module.exports = cardRouter;
