import React, { useState } from "react";
import { useChat } from "../hooks/useChat";
import { MessageCircle, Settings, Sparkle, Trash2 } from "lucide-react";
import Profile from "./Profile";
import DeleteChatModel from "./DeleteChatModel";

const AsideBar = ({ chats, currentChatId, onOpenSettings }) => {
  const chatAction = useChat();
  const [isDelete, setIsDelete] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const openChat = (chatId) => {
    chatAction.handleOpenChat(chatId, chats);
  };
  return (
    <aside className="hidden w-72 shrink-0 overflow-hidden border border-white/10 rounded-3xl md:flex md:flex-col bg-[#101116] text-white shadow-2xl">

      {/*=== LOGO=== */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 ring-1  ring-violet-400/20">
          <Sparkle size={24} strokeWidth={1.8}/>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide text-white">
            ZentraAI
          </h1>
          <p className="text-xs text-white/40">Your AI workspace</p>
        </div>
      </div>


      <div className=" pb-4 px-4">
        <button
          onClick={() => chatAction.handleNewChat()}
          className="flex w-full items-center justify-center gap-2 mt-4 rounded-xl border border-white/40 px-2 py-1.5 text-left hover:bg-white/10 cursor-pointer"
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

    {/* ====CHAT==== */}
      <div className="flex flex-col mt-4">
        {Object.values(chats).map((chat) => (
          <div
            key={chat.id}
            className={`flex gap-2 items-center w-full px-3 py-2 rounded-xl transition text-white/80 ${
              currentChatId === chat.id ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            <button
              onClick={() => {
                openChat(chat.id);
              }}
              type="button"
              className="flex flex-1 min-w-0 gap-2 items-center text-left cursor-pointer"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                {chat.title}
              </span>
            </button>

            <button
              type="button"
              title="Delete chat"
              onClick={() => {
                setSelectedChatId(chat.id);
                setIsDelete(true);
              }}
              className="shrink-0 p-1 rounded-lg hover:bg-red-500/20 hover:text-red-400 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <Profile />
      <DeleteChatModel
        isOpen={isDelete}
        onClose={() => {
          setIsDelete(false);
          setSelectedChatId(null);
        }}
        onConfirm={async () => {
          if (selectedChatId) {
            await chatAction.handleDeleteChat(selectedChatId);
          }

          setIsDelete(false);
          setSelectedChatId(null);
        }}
      />
    </aside>
  );
};

export default AsideBar;
