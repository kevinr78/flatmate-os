// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

// Routes
import authRouter from "./routes/authRoutes.js";
/* import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import choreRoutes from "./routes/choreRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import pollRoutes from "./routes/pollRoutes";
import shoppingRoutes from "./routes/shoppingRoutes"; */

// Middleware
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import houseRouter from "./routes/houseRoutes.js";

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/house", houseRouter);
/* app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/chores", choreRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/shopping", shoppingRoutes); */

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
