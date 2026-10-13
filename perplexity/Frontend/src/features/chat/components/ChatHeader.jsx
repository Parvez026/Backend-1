
import React from "react";
import { Sparkles } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.06] px-6">
      <div>
        <h2 className="text-sm font-semibold tracking-wide text-white">
          ZentraAI
        </h2>

        <p className="mt-1 text-xs text-white/40">
          Your intelligent workspace
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5">
        <Sparkles size={14} className="text-emerald-300" />

        <span className="text-xs text-emerald-300">
          AI Assistant
        </span>
      </div>
    </header>
  );
};

export default ChatHeader;