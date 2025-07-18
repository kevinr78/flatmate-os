import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    splitBetween: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isSettled: { type: Boolean, default: false },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "RoommateGroup" },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
