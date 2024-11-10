const express = require("express");
const { createEvent } = require("../controllers/eventController");

const router = express.Router();

// create user
router.post("/createEvent", createEvent);

// create event

module.exports = router;
