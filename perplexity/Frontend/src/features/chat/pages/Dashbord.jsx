import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import AsideBar from "../components/AsideBar";
import Settings from "./Settings";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";

const Dashbord = () => {
  const chat = useChat();
  const [showSetting, setShowSetting] = useState(false);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const messages = chats[currentChatId]?.messages || [];
  const isMessage=messages.length>0
  const messageEndRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chats, currentChatId]);

  return (
    <main className=" h-screen overflow-hidden bg-[#0b0c10]  text-white">
      <section className="grid w-full h-full gap-4 p-4  grid-cols-[280px_minmax(0,1fr)] ">
        {/*==== AsideBar==== */}
        <AsideBar
          chats={chats}
          currentChatId={currentChatId}
          onOpenSettings={() => setShowSetting(true)}
        />

        {showSetting ? (
          <Settings onBack={() => setShowSetting(false)} />
        ) : (
          <section className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0f1015]">
            {/* ===Header=== */}
            <ChatHeader />

            {/* ===Message=== */}
            <MessageList
              messages={messages}
              isLoading={isLoading}
              messageEndRef={messageEndRef}
            />

            {/* ====FOOTER===== */}

            <div
              className={`w-full ${
                isMessage ? "mt-auto" : "absolute top-1/2 -translate-y-1/2"
              }`}
            >
              <Footer currentChatId={currentChatId} />
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default Dashbord;
