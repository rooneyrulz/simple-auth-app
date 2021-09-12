const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "Display name is required"],
  },
  profession: {
    type: String,
    required: [true, "Profession is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author not found"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
