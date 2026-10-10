import React, { useState } from "react";
import { useChat } from "../hooks/useChat";
import { MessageCircle, Settings } from "lucide-react";
import Profile from "./Profile";

const AsideBar = ({ chats, currentChatId, onOpenSettings }) => {
  const chat = useChat();
  const [isDelete, setIsDelete] = useState(false);

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };
  return (
    <aside className="hidden border border-white/30 rounded-3xl md:flex md:flex-col bg-[#13141a]">
      <h1 className="text-3xl font-semibold px-3 py-2">ZentraAI</h1>
      <div className=" pb-2 px-2">
        <button
          onClick={() => chat.handleNewChat()}
          className="mt-4 w-fit rounded-xl border border-white/40 px-2 py-1.5 text-left hover:bg-white/10 cursor-pointer"
        >
          + New Chat
        </button>
      </div>
      <button
        onClick={onOpenSettings}
        className="w-full px-3 py-2 flex items-center gap-2 text-left rounded-xl text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        <Settings size={20} />
        <span>Setting</span>
      </button>
      <div className="flex flex-col mt-4">
        {Object.values(chats).map((chat) => (
          <button
            onClick={() => {
              openChat(chat.id);
              setIsDelete((prev)=>!prev);
            }}
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
        {isDelete && (
          <div className="text-red text-3xl">
            <h1>Hello</h1>
          </div>
        )}
      </div>
      <Profile />
    </aside>
  );
};

export default AsideBar;
