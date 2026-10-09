import React, { useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";

const Footer = ({ currentChatId }) => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const isLoading = useSelector((state) => state.chat.isLoading);

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
    <footer className="shrink-0 w-full border rounded-full border-white/60 bg-mist-900 p-4 md:py-4 md:px-5">
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

        {isLoading ? (
          <button
            className="px-2 py-1 border border-white/50 rounded-2xl"
            type="button"
            onClick={() => chat.handleStop()}
          >
            Stop
          </button>
        ) : (
          <button
            className="px-2 py-1 border border-white/50 rounded-2xl"
            type="submit"
          >
            Send
          </button>
        )}
      </form>
    </footer>
  );
};

export default Footer;
