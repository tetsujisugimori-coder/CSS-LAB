import React from 'react';
import { BookOpen, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export interface BreakdownItem {
  key: string;
  name: string;
  role: string;
  example: string;
  proTip?: string;
}

interface PropertyExplanationCardProps {
  title: string;
  property: string;
  summary: string;
  breakdown: BreakdownItem[];
  tips: string[];
  onSelectPropertyKey?: (key: string) => void;
  activeKey?: string;
}

export const PropertyExplanationCard: React.FC<PropertyExplanationCardProps> = ({
  title,
  property,
  summary,
  breakdown,
  tips,
  onSelectPropertyKey,
  activeKey,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              {title} の解説・仕組み
            </h3>
            <code className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/60">
              {property}
            </code>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            {summary}
          </p>
        </div>
      </div>

      {/* Breakdown decomposition table */}
      <div>
        <h4 className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
          パラメータの役割を分解して理解する:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {breakdown.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <div
                key={item.key}
                onClick={() => onSelectPropertyKey && onSelectPropertyKey(item.key)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-950/60 border-sky-400 ring-1 ring-sky-400'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-white">{item.name}</span>
                  <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                    {item.key}
                  </code>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {item.role}
                </p>
                {item.example && (
                  <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <span className="text-slate-500">例:</span>
                    <span className="text-amber-300">{item.example}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Web Design Tips */}
      {tips && tips.length > 0 && (
        <div className="bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-slate-950 p-3.5 rounded-lg border border-sky-900/40 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>実務デザインのコツ & ベストプラクティス</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
