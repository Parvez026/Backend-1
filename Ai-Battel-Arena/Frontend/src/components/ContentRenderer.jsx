import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

/* ─────────────────────────────────────────────
   Inline syntax highlighting (no extra deps)
───────────────────────────────────────────── */
const KEYWORDS = new Set([
  'const','let','var','function','return','if','else','for','while',
  'class','extends','interface','type','import','export','from','new',
  'this','async','await','try','catch','finally','throw','typeof',
  'instanceof','void','default','case','switch','break','public',
  'private','protected','readonly','static','abstract',
  // SQL
  'SELECT','FROM','WHERE','JOIN','LEFT','RIGHT','INNER','GROUP','BY',
  'ORDER','HAVING','LIMIT','WITH','AS','COUNT','SUM','AVG','MIN','MAX',
  'ROUND','OVER','PARTITION','CASE','WHEN','THEN','END','NULLIF','DISTINCT',
]);
const LITERALS = new Set(['true','false','null','undefined','NaN','Infinity']);

function tokenizeLine(line, lineIdx) {
  if (!line.trim()) return <div key={lineIdx} className="h-5" />;
  const comment = line.match(/^\s*(\/\/|#|--)/);
  if (comment) return (
    <div key={lineIdx} className="flex gap-4 hover:bg-white/[0.015] rounded">
      <span className="select-none text-slate-600 text-right shrink-0 w-8 text-xs font-mono pt-0.5">{lineIdx + 1}</span>
      <span className="text-slate-500 italic font-mono text-xs leading-6 whitespace-pre">{line}</span>
    </div>
  );

  const parts = [];
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|[^\w\s"'`])/g;
  let last = 0, m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) parts.push(<span key={last}>{line.slice(last, m.index)}</span>);
    const tok = m[0];
    let cls = 'text-slate-300';
    if (/^["'`]/.test(tok))           cls = 'text-emerald-400';
    else if (/^\d/.test(tok))          cls = 'text-amber-400';
    else if (LITERALS.has(tok))        cls = 'text-orange-400';
    else if (KEYWORDS.has(tok))        cls = 'text-indigo-400 font-medium';
    parts.push(<span key={m.index} className={cls}>{tok}</span>);
    last = re.lastIndex;
  }
  if (last < line.length) parts.push(<span key={last}>{line.slice(last)}</span>);

  return (
    <div key={lineIdx} className="flex gap-4 hover:bg-white/[0.015] rounded group">
      <span className="select-none text-slate-600 text-right shrink-0 w-8 text-xs font-mono pt-0.5">{lineIdx + 1}</span>
      <span className="font-mono text-xs leading-6 whitespace-pre">{parts}</span>
    </div>
  );
}

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#06080d]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/70">
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{lang || 'code'}</span>
        <button onClick={copy} className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
          {copied ? <><CheckIcon className="w-3.5 h-3.5 text-emerald-400"/><span className="text-emerald-400">Copied</span></> : <><CopyIcon className="w-3.5 h-3.5"/><span>Copy</span></>}
        </button>
      </div>
      <div className="px-4 py-3 overflow-x-auto">
        {code.split('\n').map((line, i) => tokenizeLine(line, i))}
      </div>
    </div>
  );
}

/* Inline markdown: **bold**, `code` */
function renderInline(text) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith('**')) parts.push(<strong key={m.index} className="text-slate-100 font-semibold">{t.slice(2, -2)}</strong>);
    else parts.push(<code key={m.index} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[0.83em] border border-slate-700/50">{t.slice(1, -1)}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function ContentRenderer({ text }) {
  if (!text) return null;
  const parts = [];
  const codeRe = /```(\w*)\n([\s\S]*?)```/g;
  let last = 0, m;
  while ((m = codeRe.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'md', text: text.slice(last, m.index) });
    parts.push({ type: 'code', lang: m[1] || 'text', code: m[2].trimEnd() });
    last = codeRe.lastIndex;
  }
  if (last < text.length) parts.push({ type: 'md', text: text.slice(last) });

  return (
    <div className="text-slate-300 text-sm leading-relaxed space-y-4">
      {parts.map((part, i) => {
        if (part.type === 'code') return <CodeBlock key={i} code={part.code} lang={part.lang} />;
        return part.text.split('\n\n').map((para, j) => {
          const p = para.trim();
          if (!p) return null;
          if (p.startsWith('### ')) return <h4 key={j} className="text-slate-100 font-semibold text-base mt-4 mb-1">{p.slice(4)}</h4>;
          if (p.startsWith('## '))  return <h3 key={j} className="text-slate-100 font-semibold text-lg mt-5 mb-2">{p.slice(3)}</h3>;
          if (p.startsWith('- ') || p.startsWith('* ')) return (
            <ul key={j} className="list-disc list-inside space-y-1 pl-1 text-slate-300">
              {p.split('\n').filter(Boolean).map((item, k) => <li key={k}>{renderInline(item.replace(/^[-*]\s+/, ''))}</li>)}
            </ul>
          );
          if (/^\d+\.\s/.test(p)) return (
            <ol key={j} className="list-decimal list-inside space-y-1 pl-1 text-slate-300">
              {p.split('\n').filter(Boolean).map((item, k) => <li key={k}>{renderInline(item.replace(/^\d+\.\s+/, ''))}</li>)}
            </ol>
          );
          return <p key={j} className="leading-relaxed">{renderInline(p)}</p>;
        });
      })}
    </div>
  );
}
