const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  title: String,
  time: Date,
  repeat: Boolean,
  notify: Boolean,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "RoommateGroup" },
});

module.exports = mongoose.model("Reminder", reminderSchema);
