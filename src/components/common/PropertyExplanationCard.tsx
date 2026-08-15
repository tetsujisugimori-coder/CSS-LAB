import React from 'react';
import { BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { getUIStyleClasses } from '../../utils/uiStyles';

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
  const { theme, uiStyle } = useTheme();
  const uiClasses = getUIStyleClasses(uiStyle, theme);
  const textMuted = theme.category === 'dark' ? '#94a3b8' : '#64748b';

  return (
    <div
      className={`p-4 sm:p-5 space-y-4 shadow-lg border transition-all ${uiClasses.panel}`}
      style={{
        borderColor: theme.palette.border,
      }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between gap-3 border-b pb-3"
        style={{ borderColor: theme.palette.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" style={{ color: theme.palette.primary }} />
            <h3 className="text-sm font-bold tracking-wide" style={{ color: theme.palette.text }}>
              {title} の解説・仕組み
            </h3>
            <code
              className="text-xs font-mono px-2 py-0.5 rounded border"
              style={{
                backgroundColor: theme.category === 'dark' ? '#0f172a' : '#f1f5f9',
                borderColor: theme.palette.border,
                color: theme.palette.primary,
              }}
            >
              {property}
            </code>
          </div>
          <p
            className="text-xs mt-1.5 leading-relaxed"
            style={{ color: textMuted }}
          >
            {summary}
          </p>
        </div>
      </div>

      {/* Breakdown decomposition table */}
      <div>
        <h4
          className="text-xs font-bold mb-2.5 flex items-center gap-1.5"
          style={{ color: theme.palette.text }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: theme.palette.primary }}
          />
          パラメータの役割を分解して理解する:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {breakdown.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                type="button"
                key={item.key}
                onClick={() => onSelectPropertyKey && onSelectPropertyKey(item.key)}
                className={`p-3 text-left transition-all cursor-pointer border ${uiClasses.subCard} ${
                  isActive ? 'ring-2' : ''
                }`}
                style={
                  isActive
                    ? {
                        borderColor: theme.palette.primary,
                        boxShadow: `0 0 0 1px ${theme.palette.primary}`,
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold" style={{ color: theme.palette.text }}>
                    {item.name}
                  </span>
                  <code
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: theme.category === 'dark' ? '#0f172a' : '#e2e8f0',
                      color: theme.palette.primary,
                    }}
                  >
                    {item.key}
                  </code>
                </div>
                <p
                  className="text-[11px] leading-snug"
                  style={{ color: textMuted }}
                >
                  {item.role}
                </p>
                {item.example && (
                  <div className="mt-2 text-[10px] font-mono flex items-center gap-1">
                    <span style={{ color: textMuted }}>例:</span>
                    <span className="text-amber-500 dark:text-amber-300 font-semibold">
                      {item.example}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Practical Web Design Tips */}
      {tips && tips.length > 0 && (
        <div
          className="p-3.5 rounded-lg border space-y-2"
          style={{
            backgroundColor: theme.category === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
            borderColor: theme.palette.border,
          }}
        >
          <div
            className="flex items-center gap-1.5 text-xs font-bold"
            style={{ color: theme.palette.primary }}
          >
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>実務デザインのコツ & ベストプラクティス</span>
          </div>
          <ul className="space-y-1.5 text-xs pl-1">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed" style={{ color: theme.palette.text }}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
