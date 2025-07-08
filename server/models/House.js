import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["admin", "member"], default: "member" },
    },
  ],
  invites: [{ email: String, invitedAt: Date }],
});

export default mongoose.model("House", houseSchema);
