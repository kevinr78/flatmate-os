import Chore from "../models/Chore.js";

const createChore = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;
    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title and assignedTo are required" });
    }

    const newChore = new Chore({
      title,
      description,
      assignedTo,
      dueDate,
      createdBy: req.user._id,
    });

    const savedChore = await newChore.save();
    res
      .status(201)
      .json({ message: "Chore created successfully", chore: savedChore });
  } catch (error) {
    console.error("Error creating chore:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getChores = async (req, res) => {
  try {
    const chores = await Chore.find({ house: req.user.group })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    res.status(200).json(chores);
  } catch (error) {
    console.error("Error fetching chores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateChore = async (req, res) => {
  try {
    const { choreId } = req.params;
    const updates = req.body;

    if (!choreId) {
      return res.status(400).json({ message: "Chore ID is required" });
    }

    const updatedChore = await Chore.findByIdAndUpdate(choreId, updates, {
      new: true,
    });

    if (!updatedChore) {
      return res.status(404).json({ message: "Chore not found" });
    }

    res.status(200).json({
      message: "Chore updated successfully",
      chore: updatedChore,
    });
  } catch (error) {
    console.error("Error updating chore:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteChore = async (req, res) => {
  try {
    const { choreId } = req.params;

    if (!choreId) {
      return res.status(400).json({ message: "Chore ID is required" });
    }

    const deletedChore = await Chore.findByIdAndDelete(choreId);

    if (!deletedChore) {
      return res.status(404).json({ message: "Chore not found" });
    }

    res.status(200).json({ message: "Chore deleted successfully" });
  } catch (error) {
    console.error("Error deleting chore:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createChore, getChores, updateChore, deleteChore };
