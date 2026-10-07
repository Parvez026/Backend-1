import React, { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Footer from "../components/Footer";
import AsideBar from "../components/AsideBar";
import Thinking from "../components/Thinking";

const Dashbord = () => {
  const chat = useChat();

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
    });
  }, [chats, currentChatId]);

  return (
    <main className="bg-mist-900 h-screen text-white">
      <section className="w-full h-full p-3 grid grid-cols-[300px_1fr]">
        {/*==== AsideBar==== */}
        <AsideBar chats={chats} currentChatId={currentChatId} />

        <section
          className={`relative mx-auto w-3/5 h-full min-h-0 flex flex-col min-w-0`}
        >
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
                  <>
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
                        code({ children, className, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");

                          if (match) {
                            return (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            );
                          }

                          return (
                            <code
                              className="rounded-md bg-white/10 px-1.5 py-0.5 text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },

                        pre: ({ children }) => (
                          <div className="my-3 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                            {children}
                          </div>
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto px-4 py-3 text-sm text-white/60">
                <Thinking />
              </div>
            )}
            <div ref={messageEndRef}></div>
          </div>

          {/* ====FOOTER===== */}

          <div
            className={`w-full transition-all duration-700 ease-in-out ${
              isMessage ? "mt-auto" : "absolute top-1/2 -translate-y-1/2"
            }`}
          >
            <Footer currentChatId={currentChatId} />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Dashbord;
