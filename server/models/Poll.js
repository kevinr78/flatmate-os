const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: String,
    options: [
      {
        text: String,
        votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expiresAt: Date,
    group: { type: mongoose.Schema.Types.ObjectId, ref: "RoommateGroup" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", pollSchema);
