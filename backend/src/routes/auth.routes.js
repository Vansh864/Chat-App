import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

authRouter.patch("/update-profile", authenticateUser, updateProfile);

authRouter.get("/check", authenticateUser, checkAuth);

export default authRouter;
