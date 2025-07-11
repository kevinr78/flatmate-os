import Reminder from "../models/reminderModel.js";

const createReminder = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !dueDate) {
      return res
        .status(400)
        .json({ message: "Title and due date are required" });
    }

    const newReminder = new Reminder({
      title,
      description,
      dueDate,
      createdBy: req.user._id,
      house: req.user.group,
    });

    const savedReminder = await newReminder.save();
    res
      .status(201)
      .json({
        message: "Reminder created successfully",
        reminder: savedReminder,
      });
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ house: req.user.group }).populate(
      "createdBy",
      "name email"
    );
    res.status(200).json(reminders);
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;
    const updates = req.body;

    if (!reminderId) {
      return res.status(400).json({ message: "Reminder ID is required" });
    }

    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      updates,
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res
      .status(200)
      .json({
        message: "Reminder updated successfully",
        reminder: updatedReminder,
      });
  } catch (error) {
    console.error("Error updating reminder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;

    if (!reminderId) {
      return res.status(400).json({ message: "Reminder ID is required" });
    }

    const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { createReminder, getReminders, updateReminder, deleteReminder };
