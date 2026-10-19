import React from 'react';
import { TrophyIcon, ScaleIcon, SparklesIcon } from './Icons';

export function JudgePanel({ judge }) {
  if (!judge) return null;

  const s1 = typeof judge.solution_1_score === 'number' ? judge.solution_1_score : parseFloat(judge.solution_1_score) || 0;
  const s2 = typeof judge.solution_2_score === 'number' ? judge.solution_2_score : parseFloat(judge.solution_2_score) || 0;
  const winner = s2 > s1 ? 2 : s1 > s2 ? 1 : 0;
  const diff = Math.abs(s2 - s1).toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 via-slate-900/50 to-slate-950 p-6 lg:p-8">
      {/* Background glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.07]">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
            <ScaleIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400">AI Evaluation Engine</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                <SparklesIcon className="w-3 h-3" /> Verdict
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Judge's Recommendation</h3>
          </div>
        </div>

        {/* Winner badge */}
        {winner !== 0 ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm font-semibold self-start sm:self-auto">
            <TrophyIcon className="w-4 h-4 text-amber-400" />
            Solution {winner} Recommended
            <span className="text-xs opacity-70 font-normal ml-0.5">(+{diff} pts)</span>
          </div>
        ) : (
          <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm">Draw</div>
        )}
      </div>

      {/* Score meters */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        {[
          { label: 'Solution 1', score: s1, isWin: winner === 1 },
          { label: 'Solution 2', score: s2, isWin: winner === 2 },
        ].map(({ label, score, isWin }) => (
          <div key={label} className={`rounded-xl p-5 border ${isWin ? 'bg-amber-950/20 border-amber-500/25' : 'bg-slate-900/40 border-white/[0.06]'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">{label}</span>
                {isWin && <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">Winner</span>}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-white">{score.toFixed(1)}</span>
                <span className="text-xs text-slate-500 font-mono">/ 10</span>
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isWin ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-slate-600'}`}
                style={{ width: `${Math.min(100, (score / 10) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reasoning */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: 'Solution 1 Evaluation', text: judge.solution_1_reasoning, isWin: winner === 1 },
          { label: 'Solution 2 Evaluation', text: judge.solution_2_reasoning, isWin: winner === 2 },
        ].map(({ label, text, isWin }) => (
          <div key={label} className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              <div className={`w-1.5 h-1.5 rounded-full ${isWin ? 'bg-amber-400' : 'bg-slate-600'}`} />
              {label}
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.05] text-sm text-slate-300 leading-relaxed">
              {text || 'No reasoning provided.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
