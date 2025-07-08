import { Router } from "express";
import { signup, login, refreshToken } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/refresh", refreshToken);

export default authRouter;
