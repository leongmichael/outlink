const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    admin: {
      userId: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    preferences: {
      type: [String],
      required: true,
    },
    personal: {
      zipCode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      birthdate: {
        type: Date,
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
    },
  },
  { collection: "users" }
);

var userModel = mongoose.model("User", userSchema);

export default userModel;
