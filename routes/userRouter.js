const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

// Getting all
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting one
userRouter.get("/:username", getUser, (req, res) => {
  res.json(res.user);
});

// Creating one
userRouter.post("/", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user != null) {
    return res.status(409).json({ message: "User already exists" });
  }
  user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// updating one
userRouter.patch("/", (req, res) => {});

// deleting one
userRouter.delete("/:username", getUser, async (req, res) => {
  try {
    await res.user.remove();  
    res.json({message: "User deleted successfully"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findOne({ username: req.params.username });
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = userRouter;
