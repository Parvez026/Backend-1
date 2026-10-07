import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const sendMessage = async ({message,chatId,onChat,onChunk,signal}) => {

  const response = await fetch("http://localhost:3000/api/chats/message",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        message,
        chat: chatId,
      }),
      signal
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const newChatId = response.headers.get("Chat-Id");
  const title = response.headers.get("Chat-Title");

 
  onChat({
    chatId: newChatId,
    title,
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value, {
      stream: true,
    });


    onChunk(chunk);
  }
};

export const getChat = async () => {
  const response = await api.get("/api/chats/");
  return response.data;
};

export const getMessage = async (chatId) => {
  const response = await api.get(`/api/chats/${chatId}/message`);
  return response.data;
};

export const deleteChat = async (chatId) => {
  const response = await api.delete(`/api/chats/delete/${chatId}`);
  return response.data;
};
