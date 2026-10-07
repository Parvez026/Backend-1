import React, { useState } from "react";
import { useChat } from "../hooks/useChat";

const Footer = ({ currentChatId }) => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");

  function handelSubmit(e) {
    e.preventDefault();
    const trimMessage = chatInput.trim();
    if (!trimMessage) {
      return;
    }

    chat.handelSendMessage({ message: trimMessage, chatId: currentChatId });
    setChatInput("");
  }
  return (
    <footer className="shrink-0 w-full border rounded-full border-white/60 bg-mist-800 p-4 md:py-3 md:px-5">
      <form
        onSubmit={handelSubmit}
        className="flex flex-col gap-3 px-2 md:flex-row"
      >
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="w-full border-none outline-none placeholder:text-white"
          type="text"
          placeholder="Type something..."
        />
        <button
          type="submit"
          className="border px-4 py-1 rounded-3xl text-lg transition hover:bg-white/20"
        >
          send
        </button>
      </form>
    </footer>
  );
};

export default Footer;
