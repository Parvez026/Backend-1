import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './Icons';

const SUGGESTIONS = [
  'Implement a debounce function with leading/trailing edge options in TypeScript',
  'Write an optimal SQL query for 30-day user retention cohort analysis',
  'Design a distributed rate limiter using Redis Token Bucket algorithm',
  'Implement a Promise.all polyfill from scratch in JavaScript',
];

export function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = Math.min(ref.current.scrollHeight, 180) + 'px';
    }
  }, [value]);

  const submit = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue('');
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-2.5">
      {/* Suggestion chips — visible when no conversation yet */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[11px] text-slate-500 font-medium shrink-0">Try:</span>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => { setValue(s); ref.current?.focus(); }}
            className="shrink-0 px-3 py-1 rounded-full text-[11px] bg-slate-800/80 hover:bg-slate-700 border border-white/[0.06] text-slate-300 hover:text-white transition cursor-pointer whitespace-nowrap"
          >
            {s.length > 52 ? s.slice(0, 52) + '…' : s}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="relative rounded-2xl border border-white/[0.1] bg-slate-900/90 backdrop-blur-xl shadow-2xl focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/15 transition-all p-2 sm:p-3">
        <textarea
          ref={ref}
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          disabled={isLoading}
          placeholder="Describe a programming challenge, algorithm, or system design problem… (Enter to submit)"
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-[15px] resize-none outline-none px-3 py-2 leading-relaxed"
        />
        <div className="flex items-center justify-between pt-2 px-3 border-t border-white/[0.04]">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:block">Enter to send · Shift+Enter for newline</span>
          <div className="flex items-center gap-2 ml-auto">
            {value.trim() && (
              <button
                onClick={() => setValue('')}
                className="text-xs text-slate-500 hover:text-rose-400 transition cursor-pointer"
              >Clear</button>
            )}
            <button
              onClick={submit}
              disabled={!value.trim() || isLoading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium shadow-lg shadow-indigo-500/20 transition cursor-pointer"
            >
              {isLoading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Thinking…</span></>
                : <><span>Send</span><SendIcon className="w-4 h-4" /></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
