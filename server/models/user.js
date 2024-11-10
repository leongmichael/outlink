const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    admin: {
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
    events: {
      type: [String],
      required: false,
    },
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("admin.password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.admin.password = await bcrypt.hash(this.admin.password, salt);
  next();
});

var userModel = mongoose.model("User", userSchema);

module.exports = userModel;
