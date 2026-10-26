
import React from "react";
import { Sparkles, Menu } from "lucide-react";

const ChatHeader = ({ onMenuClick }) => {
  return (
    <header className="flex h-[64px] shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] px-3 sm:h-[72px] sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Open chat history"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide text-white">
            ZentraAI
          </h2>
          <p className="mt-1 truncate text-[11px] text-white/40 sm:text-xs">
            Your intelligent workspace
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-2 py-1.5 sm:gap-2 sm:px-3">
        <Sparkles size={14} className="text-emerald-300" />
        <span className="text-[11px] text-emerald-300 sm:text-xs">
          AI Assistant
        </span>
      </div>
    </header>
  );
};

export default ChatHeader;
