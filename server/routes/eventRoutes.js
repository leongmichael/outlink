const express = require("express");
const {
  createEvent,
  getEvent,
  randomEvent,
} = require("../controllers/eventController");

const router = express.Router();

// create event
router.post("/createEvent", createEvent);

// get event info
router.post("/getEvent", getEvent);

// delete event
router.get("/randomEvent", randomEvent);

// modify event

module.exports = router;
