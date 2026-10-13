
import React from "react";

const suggestions = [
  {
    icon: "✦",
    title: "Brainstorm ideas",
    description: "Explore ideas for your next project.",
  },
  {
    icon: "⌘",
    title: "Write code",
    description: "Solve problems and debug your code.",
  },
  {
    icon: "✎",
    title: "Improve writing",
    description: "Make your writing clear and polished.",
  },
  {
    icon: "⌁",
    title: "Learn something",
    description: "Understand a topic step by step.",
  },
];

const WelcomeScreen = () => {
  return (
    <div className="absolute inset-x-0 top-[18%] flex flex-col items-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] shadow-[0_0_50px_rgba(52,211,153,0.08)]">
        <span className="text-3xl text-emerald-300">✳</span>
      </div>

      <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/70">
        Your AI workspace
      </p>

      <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
        What can I help you with?
      </h1>

      <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
        Think, create, and explore new ideas. Start a conversation with your AI
        assistant.
      </p>

      <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-left transition hover:border-emerald-300/20 hover:bg-white/[0.04]"
          >
            <p className="text-sm font-medium text-white/90">
              {item.icon} {item.title}
            </p>

            <p className="mt-2 text-xs leading-5 text-white/40">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;