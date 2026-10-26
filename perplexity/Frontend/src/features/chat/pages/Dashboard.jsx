import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import AsideBar from "../components/AsideBar";
import Settings from "./Settings";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const chat = useChat();
  const [showSetting, setShowSetting] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);

  const messages = chats[currentChatId]?.messages || [];
  const isMessage = messages.length > 0;
  const messageEndRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chats, currentChatId]);

  return (
    <main className="h-dvh overflow-hidden bg-[#0b0c10] text-white">
      <section className="grid h-full min-h-0 w-full grid-cols-1 gap-2 p-2 md:grid-cols-[280px_minmax(0,1fr)] md:gap-4 md:p-4">
        {/* Desktop Sidebar */}
        <div className="hidden min-h-0 md:block">
          <AsideBar
            chats={chats}
            currentChatId={currentChatId}
            onOpenSettings={() => setShowSetting(true)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] p-2">
              <div className="relative h-full">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="absolute right-3 top-3 z-10 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  <X size={18} />
                </button>

                <AsideBar
                  onClose={() => setIsMobileSidebarOpen(false)}
                  chats={chats}
                  currentChatId={currentChatId}
                  onOpenSettings={() => {
                    setShowSetting(true);
                    setIsMobileSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {showSetting ? (
          <div className="min-h-0 min-w-0 overflow-hidden rounded-2xl">
            <Settings onBack={() => setShowSetting(false)} />
          </div>
        ) : (
          <section className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0f1015]">
            <ChatHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

            <MessageList
              messages={messages}
              isLoading={isLoading}
              messageEndRef={messageEndRef}
            />

            <div
              className={`z-10 w-full shrink-0 pb-2 sm:pb-0 ${
                isMessage
                  ? "mt-auto"
                  : "absolute inset-x-0 top-1/2 -translate-y-1/2"
              }`}
            >
              <p className="mb-2 px-2 text-center text-[10px] text-white/40 sm:mb-3 sm:text-xs">
                ZentraAI can make mistakes. Check important information.
              </p>

              <Footer currentChatId={currentChatId} />
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
