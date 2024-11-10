const Event = require("../models/event");
const { events } = require("../models/user");
const mongoose = require("mongoose");

// create an event
const createEvent = async (req, res) => {
  const { location, date, eventManager, ageRange, users } = req.body;

  try {
    const newEvent = await Event.create({
      location,
      date,
      eventManager,
      ageRange,
      users,
    });
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ mssg: error.message });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mssg: error.message });
  }
};

module.exports = {
  createEvent,
  getEvent,
};
