import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUsersForSideBar,
  sendMessages,
} from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/users", authenticateUser, getUsersForSideBar);
messageRouter.get("/:id", authenticateUser, getMessages);

messageRouter.post("/send/:id", authenticateUser, sendMessages);

export default messageRouter;
