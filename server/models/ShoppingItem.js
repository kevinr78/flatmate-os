import mongoose from "mongoose";

const shoppingItemSchema = new mongoose.Schema({
  name: String,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isBought: { type: Boolean, default: false },
  urgency: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "RoommateGroup" },
});

export default mongoose.model("ShoppingItem", shoppingItemSchema);
