import React, { useState, useRef, useEffect } from "react";
import { SolutionCard } from "../components/SolutionCard";
import { JudgePanel } from "../components/JudgePanel";
import { ChatInput } from "../components/ChatInput";
import {
  SparklesIcon,
  RefreshIcon,
  ColumnsIcon,
  RowsIcon,
} from "../components/Icons";
// import { SAMPLE_BATTLE } from "../data/sampleBattle";
import axios from "axios";

const DEFAULT_API_URL = "http://localhost:3000/invoke";

export default function App() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState("split");
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [showApi, setShowApi] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, loading, error]);

  const handleSend = async (prompt) => {
    if (!prompt?.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      // Send user's prompt to your backend
      const response = await axios.post(
        apiUrl.trim() || "http://localhost:3000/invoke",
        {
          input: prompt.trim(),
        },
      );

      const data = response.data;

      console.log("Backend response:", data);

      // Support a direct response or a wrapped response
      const result = data?.result ?? data?.output ?? data;

      // Check whether backend returned the required fields
      if (
        result?.solution_1 == null ||
        result?.solution_2 == null ||
        result?.judge == null
      ) {
        console.error("Unexpected backend response:", data);

        throw new Error(
          "Backend response is missing solution_1, solution_2, or judge.",
        );
      }

      // Convert backend response into a battle object
      const battle = {
        ...result,
        prompt: result.problem || prompt.trim(),
      };

      setHistory((previous) => [...previous, battle]);
    } catch (err) {
      console.error("API request failed:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setHistory([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0b0f17]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[15px] tracking-tight text-white">
                  ArenaAI
                </span>

                <span className="hidden sm:inline text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Dual Solution Judge
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Layout toggle */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900 border border-white/[0.06]">
              {[
                {
                  mode: "split",
                  Icon: ColumnsIcon,
                  label: "Split",
                },
                {
                  mode: "stacked",
                  Icon: RowsIcon,
                  label: "Stack",
                },
              ].map(({ mode, Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setLayout(mode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    layout === mode
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Backend API */}
            <button
              onClick={() => setShowApi((previous) => !previous)}
              title="Configure your backend API"
              className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 transition cursor-pointer"
            >
              ● API
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              title="Reset conversation"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-950/20 border border-white/[0.06] hover:border-rose-900/40 transition cursor-pointer"
            >
              <RefreshIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* API URL configuration */}
        {showApi && (
          <div className="border-t border-white/[0.06] bg-slate-950/80 px-6 lg:px-12 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono shrink-0">
                Backend POST URL:
              </span>

              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://localhost:3000/invoke"
                className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-600 font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}
      </header>

      {/* Conversation */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 pt-12 pb-52 space-y-20">
        {/* API error */}
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/30 p-4 text-sm text-rose-300">
            <p className="font-semibold mb-1">Request failed</p>
            <p>{error}</p>
          </div>
        )}
       
        {/* Display all battle results */}
        {history.map((turn, index) => (
          <div key={index} className="space-y-6">
            {/* Question */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-sm text-indigo-400 mb-2">Question</p>
              <h2 className="text-lg font-semibold text-white">
                {turn.problem || turn.prompt}
              </h2>
            </div>

            {/* Both AI solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-indigo-400 font-semibold mb-4">
                  Solution 1
                </h3>
                <div className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">
                  {turn.solution_1}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-purple-400 font-semibold mb-4">
                  Solution 2
                </h3>
                <div className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">
                  {turn.solution_2}
                </div>
              </div>
            </div>

            {/* Judge evaluation */}
            {turn.judge && (
              <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6">
                <h3 className="text-emerald-400 text-lg font-semibold mb-5">
                  Judge Evaluation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">
                      Solution 1 Score
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {turn.judge.solution_1_score}/10
                    </p>
                    <p className="mt-3 text-sm text-slate-300 whitespace-pre-wrap">
                      {turn.judge.solution_1_reasoning}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400 mb-2">
                      Solution 2 Score
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {turn.judge.solution_2_score}/10
                    </p>
                    <p className="mt-3 text-sm text-slate-300 whitespace-pre-wrap">
                      {turn.judge.solution_2_reasoning}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            <div className="rounded-2xl border border-white/[0.07] bg-slate-900/40 p-8">
              <div className="h-4 w-24 bg-slate-800 rounded mb-4" />
              <div className="h-6 w-3/4 bg-slate-800 rounded" />
            </div>

            <div className="rounded-2xl border border-indigo-500/20 bg-slate-900/40 p-8 space-y-4">
              <div className="h-5 w-48 bg-slate-800 rounded" />
              <div className="grid grid-cols-2 gap-5">
                <div className="h-20 bg-slate-800/50 rounded-xl" />
                <div className="h-20 bg-slate-800/50 rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              <div className="h-64 rounded-2xl bg-slate-900/40 border border-white/[0.07]" />
              <div className="h-64 rounded-2xl bg-slate-900/40 border border-white/[0.07]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      {/* Chat input */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="pointer-events-auto bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/96 to-transparent pt-8 pb-5 px-4 sm:px-6">
          <ChatInput onSend={handleSend} isLoading={loading} />
        </div>
      </footer>
    </div>
  );
}
