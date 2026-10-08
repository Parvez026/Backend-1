import React from "react";
import { useChat } from "../hooks/useChat";
import { MessageCircle } from "lucide-react";

const AsideBar = ({ chats, currentChatId }) => {
  const chat = useChat();

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };
  return (
    <aside className="hidden border border-white/30 rounded-3xl p-4 md:flex md:flex-col">
      <h1 className="text-3xl font-semibold">ZentraAI</h1>
      <div className="border-b pb-2 border-b-white/40">
        <button
          onClick={() => chat.handleNewChat()}
          className="mt-4 w-fit rounded-xl border border-white/40 px-2 py-1.5 text-left hover:bg-white/10"
        >
          + New Chat
        </button>
      </div>
      <div className="flex flex-col mt-4">
        {Object.values(chats).map((chat) => (
          <button
            onClick={() => openChat(chat.id)}
            key={chat.id}
            type="button"
            className={`flex gap-2 items-center w-full text-left cursor-pointer px-3 py-2 rounded-xl transition text-white/80 hover:text-white 
                    ${
                      currentChatId === chat.id
                        ? "bg-white/15"
                        : "hover:bg-white/10"
                    }`}
          >
            <MessageCircle size={20} className="shrink-0" />
            <span className="min-w-0 overflow-hidden whitespace-nowrap text-ellipsis">
              {chat.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AsideBar;
