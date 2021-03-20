const express = require("express");
const router = express.Router();

// Getting all
router.get("/", (req, res) => {
  res.send("Hello world");
});

// Getting one
router.get("/:id", (req, res) => {});
// Creating one
router.post("/", (req, res) => {});
// updating one
router.patch("/", (req, res) => {});

// deleting one
router.delete("/:id", (req, res) => {});

module.exports = router;
