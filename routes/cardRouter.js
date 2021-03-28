const express = require("express");
const cardRouter = express.Router();

// Getting all
cardRouter.get("/", (req, res) => {
  res.send("Hello world");
});

// Getting one
cardRouter.get("/:id", (req, res) => {
  res.send(req.params.id);
});
// Creating one
cardRouter.post("/", (req, res) => {});
// updating one
cardRouter.patch("/", (req, res) => {});

// deleting one
cardRouter.delete("/:id", (req, res) => {});

module.exports = cardRouter;
