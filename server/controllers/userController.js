const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

module.exports = {
  createUser,
  loginUser,
};
