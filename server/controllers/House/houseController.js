import House from "../../models/House.js";
import User from "../../models/User.js";
import CustomError from "../../utils/customError.js";
import { checkIfUserExists } from "../../utils/services.js";

const createHouse = async (req, res) => {
  try {
    const { name, inviteList } = req.body;
    console.log("Creating house with data:", req.body);
    const parsedInviteList = inviteList ? inviteList.split(",") : [];
    if (!name) {
      throw new CustomError("Name and createdBy are required", 400);
    }

    if (await House.exists({ name })) {
      throw new CustomError("Group with this name already exists", 400);
    }
    const user = await checkIfUserExists({ _id: req.user._id });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const newGroup = new House({
      name,
      createdBy: req.user._id,
      members: [{ user: req.user._id, role: "admin" }],
      invites: parsedInviteList
        ? parsedInviteList.map((email) => ({
            email,
            invitedAt: new Date(),
          }))
        : [],
    });

    user.group = newGroup._id;
    await user.save();

    const savedGroup = await newGroup.save();
    res.status(201).json({
      success: true,
      message: "House created successfully",
      data: { house: savedGroup },
    });
  } catch (error) {
    console.error("Error creating house:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    if (!houseId) {
      throw new CustomError("Group ID is required", 400);
    }
    const deletetGroup = await House.findByIdAndDelete(houseId);
    if (!deletetGroup) {
      throw new CustomError("Group not found", 404);
    }
    res.status(200).json({ message: "House deleted successfully" });
  } catch (error) {
    console.error("Error deleting house:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const joinHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const { userId } = req.body;
    if (!houseId || !userId) {
      throw new CustomError("Group ID and User ID are required", 400);
    }

    const user = await checkIfUserExists({ _id: userId });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const roomateGroup = await House.findById(houseId);
    if (!roomateGroup) {
      throw new CustomError("Roommate group not found", 404);
    }
    if (
      roomateGroup.members.some((member) => member.user.toString() === userId)
    ) {
      throw new CustomError("User is already a member of this group", 400);
    }
    if (roomateGroup.invites.some((invite) => invite.email === user.email)) {
      roomateGroup.members.push({ user: userId, role: "member" });
      await roomateGroup.save();
      user.group = houseId;
      await user.save();
      res.status(200).json({ message: "User added to the house successfully" });
    } else {
      throw new CustomError("User is not invited to this group", 400);
    }
  } catch (error) {
    console.error("Error joining house:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const inviteToHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const { email } = req.body;
    if (!houseId || !email) {
      throw new CustomError("Group ID and email are required", 400);
    }

    const roomateGroup = await House.findById(houseId);
    if (!roomateGroup) {
      throw new CustomError("Roommate group not found", 404);
    }

    if (roomateGroup.invites.some((invite) => invite.email === email)) {
      throw new CustomError("User is already invited to this group", 400);
    }

    roomateGroup.invites.push({ email, invitedAt: new Date() });
    await roomateGroup.save();

    res.status(200).json({ message: "User invited successfully" });
  } catch (error) {
    console.error("Error inviting to house:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getHouseDetails = async (req, res) => {
  try {
    const { houseId } = req.params;
    if (!houseId) {
      throw new CustomError("Group ID is required", 400);
    }

    const roomateGroup = await House.findById(houseId).populate(
      "members.user",
      "name email"
    );
    if (!roomateGroup) {
      throw new CustomError("Roommate group not found", 404);
    }

    res.status(200).json(roomateGroup);
  } catch (error) {
    console.error("Error getting house details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserHouseDetails = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user._id;
    const user = await User.findById(userId).populate("group");
    if (!user || !user.group) {
      throw new CustomError("User or group not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "User house details retrieved successfully",
      data: {
        house: user.group,
      },
    });
  } catch (error) {
    console.error("Error getting user house details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createHouse,
  deleteHouse,
  joinHouse,
  inviteToHouse,
  getHouseDetails,
  getUserHouseDetails,
};
