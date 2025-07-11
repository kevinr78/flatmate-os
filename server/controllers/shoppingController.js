import Shopping from "../models/shoppingModel.js";

const createShoppingItem = async (req, res) => {
  try {
    const { name, quantity, purchasedBy } = req.body;
    if (!name || !quantity || !purchasedBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Shopping({
      name,
      quantity,
      purchasedBy,
      createdBy: req.user._id,
      house: req.user.group,
    });

    const savedItem = await newItem.save();
    res
      .status(201)
      .json({ message: "Shopping item created successfully", item: savedItem });
  } catch (error) {
    console.error("Error creating shopping item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getShoppingItems = async (req, res) => {
  try {
    const items = await Shopping.find({ house: req.user.group })
      .populate("purchasedBy", "name email")
      .populate("createdBy", "name email");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching shopping items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateShoppingItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const updates = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const updatedItem = await Shopping.findByIdAndUpdate(itemId, updates, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Shopping item not found" });
    }

    res
      .status(200)
      .json({
        message: "Shopping item updated successfully",
        item: updatedItem,
      });
  } catch (error) {
    console.error("Error updating shopping item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteShoppingItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const deletedItem = await Shopping.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Shopping item not found" });
    }

    res.status(200).json({ message: "Shopping item deleted successfully" });
  } catch (error) {
    console.error("Error deleting shopping item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  createShoppingItem,
  getShoppingItems,
  updateShoppingItem,
  deleteShoppingItem,
};
