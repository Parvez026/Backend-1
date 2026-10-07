import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },

  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        id: chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
    },

    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      state.chats[chatId].messages.push({ content, role });
    },

    addMessage: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages.push(...messages);
    },

    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;

      state.chats[chatId].messages = messages;
    },

    appendMessage: (state, action) => {
      const { chatId, content } = action.payload;

      if (!state.chats[chatId]) return;

      const messages = state.chats[chatId].messages;

      if (messages.length === 0) return;

      messages[messages.length - 1].content += content;
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createNewChat,
  addNewMessage,
  addMessage,
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  setMessages,
  appendMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
