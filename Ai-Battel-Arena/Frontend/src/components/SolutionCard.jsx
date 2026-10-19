import React, { useState } from 'react';
import { ContentRenderer } from './ContentRenderer';
import { TrophyIcon, CopyIcon, CheckIcon } from './Icons';

export function SolutionCard({ solutionNumber, title, content, score, isWinner, reasoning }) {
  const [copied, setCopied] = useState(false);
  const numScore = typeof score === 'number' ? score : parseFloat(score) || 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
      isWinner
        ? 'border-amber-500/30 bg-gradient-to-b from-[#1a1608]/60 to-slate-900/60'
        : 'border-white/[0.07] bg-slate-900/40 hover:border-white/[0.12]'
    }`}>
      {/* Winner top accent */}
      {isWinner && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0 rounded-t-2xl" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono border ${
            isWinner
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}>{solutionNumber}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm tracking-tight">{title}</span>
              {isWinner && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <TrophyIcon className="w-3 h-3 text-amber-400" />
                  Winner
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-mono text-base font-bold text-white">{numScore.toFixed(1)}</span>
              <span className="text-xs text-slate-500 font-mono">/ 10</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-white/[0.06] transition cursor-pointer"
        >
          {copied
            ? <><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
            : <><CopyIcon className="w-3.5 h-3.5" /><span>Copy</span></>
          }
        </button>
      </div>

      {/* Score bar */}
      <div className="px-6 pt-4">
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isWinner ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-slate-600'
            }`}
            style={{ width: `${(numScore / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 overflow-x-hidden">
        <ContentRenderer text={content} />
      </div>

      {/* Reasoning footer */}
      {reasoning && (
        <div className="px-6 py-4 border-t border-white/[0.05] bg-black/20 rounded-b-2xl">
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300 mr-1">Judge:</span>
            {reasoning}
          </p>
        </div>
      )}
    </div>
  );
}
