import { Router } from "express";
import {
  createHouse,
  deleteHouse,
  getHouseDetails,
  inviteToHouse,
  joinHouse,
  getUserHouseDetails,
} from "../controllers/House/houseController.js";
import { protect } from "../middleware/authMiddleware.js";
const houseRouter = Router();

houseRouter.get("/details", protect, getUserHouseDetails);
houseRouter.get("/:houseId", protect, getHouseDetails);
houseRouter.post("/", protect, createHouse);
houseRouter.delete("/:houseId", protect, deleteHouse);
houseRouter.post("/:houseId/join", protect, joinHouse);
houseRouter.post("/:houseId/invite", protect, inviteToHouse);

export default houseRouter;
