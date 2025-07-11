import Poll from "../models/Poll.js";

const createPoll = async (req, res) => {
  try {
    const { title, options } = req.body;

    if (!title || !options || options.length < 2) {
      return res
        .status(400)
        .json({ message: "Title and at least two options are required" });
    }

    const newPoll = new Poll({
      title,
      options,
      createdBy: req.user._id,
      house: req.user.group,
    });

    const savedPoll = await newPoll.save();
    res
      .status(201)
      .json({ message: "Poll created successfully", poll: savedPoll });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ house: req.user.group }).populate(
      "createdBy",
      "name email"
    );
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const updates = req.body;

    if (!pollId) {
      return res.status(400).json({ message: "Poll ID is required" });
    }

    const updatedPoll = await Poll.findByIdAndUpdate(pollId, updates, {
      new: true,
    });

    if (!updatedPoll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res
      .status(200)
      .json({ message: "Poll updated successfully", poll: updatedPoll });
  } catch (error) {
    console.error("Error updating poll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    if (!pollId) {
      return res.status(400).json({ message: "Poll ID is required" });
    }

    const deletedPoll = await Poll.findByIdAndDelete(pollId);

    if (!deletedPoll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.error("Error deleting poll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createPoll, getPolls, updatePoll, deletePoll };
