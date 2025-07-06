const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    group: { type: mongoose.Schema.Types.ObjectId, ref: "RoommateGroup" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
