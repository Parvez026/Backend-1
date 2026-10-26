
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Thinking from "./Thinking";

const MessageList = ({ messages, isLoading, messageEndRef }) => {
  return (
    <div className="messages relative flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-6 sm:py-5">
      {messages.map((message, index) => (
        <div
          key={message._id || `${message.role}-${index}`}
          className={`min-w-0 w-fit max-w-[95%] break-words rounded-2xl px-3 py-3 text-sm sm:max-w-[85%] sm:px-4 sm:text-base ${
            message.role === "user"
              ? "ml-auto rounded-br-sm border border-white/10 bg-white/[0.08] text-white"
              : "mr-auto text-white/90"
          }`}
        >
          {message.role === "user" ? (
            <p className="whitespace-pre-wrap [overflow-wrap:anywhere]">
              {message.content}
            </p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0 [overflow-wrap:anywhere]">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">
                    {children}
                  </ol>
                ),
                h1: ({ children }) => (
                  <h1 className="mb-2 text-lg font-bold">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-2 text-base font-semibold">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 text-sm font-semibold">{children}</h3>
                ),
                code({ children, className, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  if (match) {
                    return (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: "14px",
                          fontSize: "13px",
                          maxWidth: "100%",
                          overflowX: "auto",
                        }}
                        wrapLongLines
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  }

                  return (
                    <code
                      className="break-words rounded-md bg-white/10 px-1.5 py-0.5 text-[0.85em]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <div className="my-3 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                    {children}
                  </div>
                ),
                table: ({ children }) => (
                  <div className="my-3 max-w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-white/15 px-3 py-2 font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-white/15 px-3 py-2">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="mr-auto max-w-full px-3 py-3 text-sm text-white/60 sm:px-4">
          <Thinking />
        </div>
      )}

      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
