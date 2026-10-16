import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Thinking from "./Thinking";

const MessageList = ({ messages, isLoading, messageEndRef }) => {
  return (
    <div className="messages relative flex-1 min-h-0 space-y-3 overflow-y-auto px-6 py-5">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`mt-2 w-fit max-w-[80%] rounded-2xl px-4 py-3 text-sm md:text-base ${
            message.role === "user"
              ? "ml-auto rounded-br-none bg-white/10 text-white"
              : "mr-auto text-white/90"
          }`}
        >
          {message.role === "user" ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
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
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="mr-auto px-4 py-3 text-sm text-white/60">
          <Thinking />
        </div>
      )}

      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
