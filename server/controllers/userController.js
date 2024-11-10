const User = require("../models/user");

// create a user
const createUser = async (req, res) => {
  const {
    admin: { userId, email, password },
    preferences,
    personal: { zipCode, city, gender, birthdate, points },
  } = req.body;

  try {
    const newUser = await User.create({
      admin: { userId, email, password },
      preferences,
      personal: { zipCode, city, gender, birthdate, points },
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
