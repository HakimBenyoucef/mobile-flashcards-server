const express = require("express");
const quizRouter = express.Router();

// Getting all
quizRouter.get("/", (req, res) => {
  res.send("Hello world");
});

// Getting one
quizRouter.get("/:id", (req, res) => {
  res.send(req.params.id);
});
// Creating one
quizRouter.post("/", (req, res) => {});
// updating one
quizRouter.patch("/", (req, res) => {});

// deleting one
quizRouter.delete("/:id", (req, res) => {});

module.exports = quizRouter;
