import React, { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "../components/Footer";
import AsideBar from "../components/AsideBar";

const Dashbord = () => {
  const chat = useChat();

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
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
    <main className="bg-mist-900 h-screen text-white">
      <section className="w-full h-full p-3 grid grid-cols-[300px_1fr]">
        {/*==== AsideBar==== */}
        <AsideBar chats={chats} />

        <section className="relative mx-auto w-3/5 h-full min-h-0 flex flex-col min-w-0">
          {/* ===Message=== */}
          <div className="messages flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">
            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message._id}
                className={`max-w-[80%] w-fit rounded-2xl mt-2 px-4 py-3 text-sm md:text-base ${
                  message.role === "user"
                    ? "ml-auto rounded-br-none bg-white/12 text-white"
                    : "mr-auto border-none  text-white/90"
                }`}
              >
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-2 list-disc pl-5">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-2 list-decimal pl-5">{children}</ol>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-white/10 px-1 py-0.5">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                          {children}
                        </pre>
                      ),
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          {/* ====FOOTER===== */}
          <Footer
            currentChatId={currentChatId}
          />
        </section>
      </section>
    </main>
  );
};

export default Dashbord;
