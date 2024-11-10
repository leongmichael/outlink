const express = require("express");
const { createEvent } = require("../controllers/eventController");

const router = express.Router();

// create event
router.post("/createEvent", createEvent);

// get event info

// delete event

// modify event

module.exports = router;
