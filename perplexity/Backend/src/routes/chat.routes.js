import { Router } from "express";
import { deleteChat, getChats, getMessage, sendMessage } from "../controller/chat.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const chatRouter=Router()


chatRouter.post("/message",authUser,sendMessage)

chatRouter.get("/",authUser,getChats)

chatRouter.get("/:chatId/message",authUser,getMessage)

chatRouter.delete("/delete/:chatId",authUser,deleteChat)

export default chatRouter