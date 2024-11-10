const express = require("express");

const {
  createUser,
  loginUser,
  addEvent,
} = require("../controllers/userController");

const router = express.Router();

// create user
router.post("/createAccount", createUser);

// user login
router.post("/login", loginUser);

// user add event
router.post("/addEvent", addEvent);

module.exports = router;
