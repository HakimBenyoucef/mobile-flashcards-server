const express = require("express");
const quizRouter = express.Router();

const Quiz = require("../models/quiz");

// Getting all
quizRouter.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting one
quizRouter.get("/:id", getQuiz, (req, res) => {
  res.json(res.quiz);
});

// Creating one
quizRouter.post("/", async (req, res) => {
  let quiz = await Quiz.findOne({ name: req.body.name });
  if (quiz != null) {
    return res.status(409).json({ message: "Quiz already exists" });
  }
  quiz = new Quiz({
    name: req.body.name,
  });
  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// updating one
quizRouter.patch("/", (req, res) => {});

// deleting one
quizRouter.delete("/:id", getQuiz, async (req, res) => {
  try {
    await res.quiz.remove();
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getQuiz(req, res, next) {
  let quiz;
  try {
    quiz = await Quiz.findOne({ _id: req.params.id });
    if (quiz == null) {
      return res.status(404).json({ message: "Quiz not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.quiz = quiz;
  next();
}

module.exports = quizRouter;
