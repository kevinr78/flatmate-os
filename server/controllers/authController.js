import User from "../models/User.js";
import CustomError from "../utils/customError.js";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../utils/generateToken.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new CustomError("Please provide all fields", 400);
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new CustomError("User already exists", 400);
    }
    const user = new User(req.body);
    const newUser = await user.save();

    if (!newUser) {
      throw new CustomError("User registration failed", 500);
    }
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError("Please provide email and password", 400);
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      throw new CustomError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) throw new CustomError("No refresh token provided", 401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.id);
    res.json({ accessToken });
  } catch (err) {
    throw new CustomError("Invalid refresh token", 403);
  }
};

export { signup, login, refreshToken };
