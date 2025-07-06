const mongoose = require("mongoose");

const choreSchema = new mongoose.Schema({
  task: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: Date,
  isCompleted: { type: Boolean, default: false },
  repeat: { type: String, enum: ["none", "daily", "weekly"], default: "none" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "RoommateGroup" },
});

module.exports = mongoose.model("Chore", choreSchema);
