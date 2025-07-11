import Expense from "../models/Expense.js";

const createExpense = async (req, res) => {
  try {
    const { title, amount, paidBy, participants } = req.body;

    if (!title || !amount || !paidBy || !participants) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      title,
      amount,
      paidBy,
      participants,
      createdBy: req.user._id,
      house: req.user.group,
    });

    const savedExpense = await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense created successfully", expense: savedExpense });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ house: req.user.group })
      .populate("paidBy", "name email")
      .populate("participants.user", "name email");

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const updates = req.body;

    if (!expenseId) {
      return res.status(400).json({ message: "Expense ID is required" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, updates, {
      new: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res
      .status(200)
      .json({
        message: "Expense updated successfully",
        expense: updatedExpense,
      });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      return res.status(400).json({ message: "Expense ID is required" });
    }

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { createExpense, getExpenses, updateExpense, deleteExpense };
