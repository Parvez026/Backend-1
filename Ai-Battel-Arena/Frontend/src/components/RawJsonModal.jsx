import React, { useState } from 'react';
import { CloseIcon, CopyIcon, CheckIcon } from './Icons';

export function RawJsonModal({ isOpen, onClose, data, onApplyCustomData }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customJsonText, setCustomJsonText] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const formattedJson = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(customJsonText);
      if (!parsed.problem || !parsed.solution_1 || !parsed.judge) {
        throw new Error('JSON must contain "problem", "solution_1", and "judge" object.');
      }
      onApplyCustomData(parsed);
      setIsEditing(false);
      setError('');
      onClose();
    } catch (err) {
      setError(err.message || 'Invalid JSON format');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/[0.12] bg-[#0c1017] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-slate-900/60">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Schema Payload (Google Stitch Format)
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Exact schema: problem, solution_1, solution_2, judge
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setCustomJsonText(formattedJson);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  Edit / Paste Custom
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs leading-relaxed">
          {isEditing ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 font-sans">
                Paste your custom JSON payload matching the application schema:
              </p>
              <textarea
                rows={16}
                value={customJsonText}
                onChange={(e) => setCustomJsonText(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#070a0f] text-slate-200 border border-slate-700 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
              {error && <p className="text-xs text-rose-400 font-sans">{error}</p>}
              <button
                onClick={handleApply}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-medium transition cursor-pointer"
              >
                Load Custom JSON Into Arena
              </button>
            </div>
          ) : (
            <pre className="p-4 rounded-xl bg-[#070a0f] text-indigo-300 border border-slate-800/80 overflow-x-auto whitespace-pre">
              {formattedJson}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
