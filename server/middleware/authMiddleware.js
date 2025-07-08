import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new CustomError("Not authorized, token missing", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password _id");
    next();
  } catch (err) {
    throw new CustomError("Invalid or expired token", 403);
  }
};

export { protect };
