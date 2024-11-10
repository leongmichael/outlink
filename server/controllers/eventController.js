const Event = require("../models/event");

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

module.exports = {
  createEvent,
};
