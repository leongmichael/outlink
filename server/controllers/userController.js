const User = require("../models/user");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");


// register a user
const createUser = async (req, res) => {
  try {
    // get user information
    const {
      admin: { email, password },
      preferences,
      personal: { zipCode, city, gender, birthdate, points },
    } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ "admin.email": email });
    if (existingUser) {
      return res.status(400).json({ mssg: "User already exists" });
    }

    // create a new user
    const newUser = await User.create({
      admin: { email, password },
      preferences,
      personal: { zipCode, city, gender, birthdate, points },
    });
    await newUser.save();

    res.status(200).json(newUser);
    //res.status(200).json({ mssg: "hey" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // see if user exists
    const user = await User.findOne({ "admin.email": email });
    if (!user) return res.status(400).json({ mssg: "user not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.admin.password);

    if (!isMatch) {
      console.log("password: ", password);
      console.log("userpass: ", user.admin.password);
      return res.status(400).json({ message: "password incorrect" });
    }
    res.json({ mssg: "User logged in" });
  } catch (error) {
    res.status(401).json({ mssg: error.message });
  }
};


// user add event
const addEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body; // Extract IDs from route parameters
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    // Find the user by ID
    const user = await User.findById(userId);

    // If user not found, return an error response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the event already exists in the user's events
    if (!user.events.includes(eventId)) {
      user.events.push(eventId); // Add event ID to the user's events array
      await user.save(); // Save changes to the database
    }

    res.status(200).json({ message: "Event added to user", user });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while adding the event" });
  }
};

module.exports = {
  createUser,
  loginUser,
  addEvent,
};
