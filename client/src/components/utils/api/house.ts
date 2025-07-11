import API from "./axios";
import { HouseForm } from "../types";

const createHouse = (houseData: HouseForm) => API.post("/house", houseData);
const getUserHouseDetails = () => API.get("/house/details");

export { createHouse, getUserHouseDetails };
