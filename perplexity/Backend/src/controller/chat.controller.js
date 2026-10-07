import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let title = null;
  let chat = null;

  if (!chatId) {
    title = await generateChatTitle(message);

    chat = await chatModel.create({
      user: req.user.id,
      title,
    });
  }

  const finalChatId = chatId || chat._id;

  await messageModel.create({
    chat: finalChatId,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({
    chat: finalChatId,
  });

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");

  // Send chat information to frontend
  res.setHeader("Chat-Id", finalChatId.toString());

  if (title) {
    res.setHeader("Chat-Title", title);
  }


  let fullResponse = "";

  for await (const chunk of generateResponse(messages)) {
    fullResponse += chunk;
    res.write(chunk);
  }

  await messageModel.create({
    chat: finalChatId,
    content: fullResponse,
    role: "ai",
  });

  res.end();
}

export async function getChats(req, res) {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  res.status(200).json({
    message: "chat retrived successfully",
    chats,
  });
}

export async function getMessage(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json({
    message: "Message retrived successfully",
    messages,
  });
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: req.user.id,
  });

  await messageModel.deleteMany({
    chat: chatId,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  res.status(200).json({
    message: "Chat deleted successfully",
  });
}
