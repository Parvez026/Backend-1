import {
  addNewMessage,
  setChats,
  setMessages,
  setCurrentChatId,
  setLoading,
  addMessage,
  appendMessage,
  createNewChat,
} from "../chat.slice";
import { getChat, getMessage, sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handelSendMessage({ message, chatId }) {
    dispatch(setLoading(true));

    let currentChatId = chatId;

    try {
      await sendMessage({
        message,
        chatId,
        onChat: ({ chatId: newChatId, title }) => {
          currentChatId = newChatId;

          // New chat
          if (!chatId) {
            dispatch(
              createNewChat({
                chatId: newChatId,
                title,
              }),
            );
          }

          // User message
          dispatch(
            addNewMessage({
              chatId: newChatId,
              content: message,
              role: "user",
            }),
          );

          // Empty AI message
          dispatch(
            addNewMessage({
              chatId: newChatId,
              content: "",
              role: "ai",
            }),
          );

          // Current chat
          dispatch(setCurrentChatId(newChatId));
        },

        // AI response chunks
        onChunk: (chunk) => {
          dispatch(
            appendMessage({
              chatId: currentChatId,
              content: chunk,
            }),
          );
        },
      });
    } catch (error) {
      console.log("SEND MESSAGE ERROR:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    dispatch(setLoading(true));

    const data = await getChat();
    const { chats } = data;

    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handleGetMessages(chatId) {
    const data = await getMessage(chatId);
    dispatch(
      setMessages({
        chatId,
        messages: data.messages,
      }),
    );
  }

  async function handleOpenChat(chatId, chats) {
    if (chats[chatId]?.messages.length === 0) {
      const data = await getMessage(chatId);
      const { messages } = data;

      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
        role: msg.role,
      }));
      dispatch(
        addMessage({
          chatId,
          messages: formattedMessages,
        }),
      );
    }
    dispatch(setCurrentChatId(chatId));
  }

  function handleNewChat() {
    dispatch(setCurrentChatId(null));
  }

  return {
    initializeSocketConnection,
    handelSendMessage,
    handleGetChats,
    handleGetMessages,
    handleOpenChat,
    handleNewChat,
  };
};
