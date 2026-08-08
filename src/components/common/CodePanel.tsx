import React, { useState } from 'react';
import { Copy, Check, Code, FileText, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../context/ThemeContext';

interface TokenSegment {
  text: string;
  type?: 'selector' | 'property' | 'value' | 'punctuation' | 'highlight' | 'unit';
  tokenKey?: string;
  isHighlighted?: boolean;
}

interface CodePanelProps {
  cssRules: string;
  inlineStyle?: string;
  tailwindTip?: string;
  highlightedToken?: string;
  onHoverToken?: (tokenKey?: string) => void;
  title?: string;
}

export const CodePanel: React.FC<CodePanelProps> = ({
  cssRules,
  inlineStyle,
  tailwindTip,
  highlightedToken,
  onHoverToken,
  title = '生成されたCSSコード',
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'css' | 'inline' | 'tailwind'>('css');

  const copyToClipboard = async () => {
    try {
      const textToCopy = 
        viewMode === 'inline' 
          ? (inlineStyle || cssRules) 
          : (viewMode === 'tailwind' && tailwindTip ? tailwindTip : cssRules);
      
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      // Trigger a small subtle confetti burst
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.85 },
        colors: [theme.palette.primary, theme.palette.secondary, '#34d399'],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div 
      className="rounded-xl overflow-hidden shadow-xl border transition-colors"
      style={{
        backgroundColor: theme.category === 'dark' ? '#020617' : '#f8fafc',
        borderColor: theme.palette.border,
      }}
    >
      {/* Code Header with Mode Switcher & Copy Button */}
      <div 
        className="flex items-center justify-between px-3.5 py-2 border-b flex-wrap gap-2 transition-colors"
        style={{
          backgroundColor: theme.category === 'dark' ? '#0f172a' : '#ffffff',
          borderColor: theme.palette.border,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs font-bold font-mono flex items-center gap-1" style={{ color: theme.palette.text }}>
            <Code className="w-3.5 h-3.5" style={{ color: theme.palette.primary }} />
            {title}
          </span>
        </div>

        {/* View Mode Buttons & Copy */}
        <div className="flex items-center gap-1.5">
          <div 
            className="rounded-lg p-0.5 border flex items-center text-[10px]"
            style={{
              backgroundColor: theme.category === 'dark' ? '#020617' : '#f1f5f9',
              borderColor: theme.palette.border,
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('css')}
              className={`px-2 py-0.5 rounded font-mono font-medium transition cursor-pointer ${
                viewMode === 'css' ? 'font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={
                viewMode === 'css'
                  ? {
                      backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(79, 70, 229, 0.15)',
                      color: theme.palette.primary,
                    }
                  : undefined
              }
            >
              CSS
            </button>
            {inlineStyle && (
              <button
                type="button"
                onClick={() => setViewMode('inline')}
                className={`px-2 py-0.5 rounded font-mono font-medium transition cursor-pointer ${
                  viewMode === 'inline' ? 'font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                style={
                  viewMode === 'inline'
                    ? {
                        backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(79, 70, 229, 0.15)',
                        color: theme.palette.primary,
                      }
                    : undefined
                }
              >
                Inline
              </button>
            )}
            {tailwindTip && (
              <button
                type="button"
                onClick={() => setViewMode('tailwind')}
                className={`px-2 py-0.5 rounded font-mono font-medium transition cursor-pointer ${
                  viewMode === 'tailwind' ? 'font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                style={
                  viewMode === 'tailwind'
                    ? {
                        backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(79, 70, 229, 0.15)',
                        color: theme.palette.primary,
                      }
                    : undefined
                }
              >
                Tailwind
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer select-none"
            style={{
              backgroundColor: copied ? '#10b981' : theme.palette.primary,
              color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
            }}
            title="CSSコードをクリップボードにコピー"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>コピー完了！</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>CSSをコピー</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
        {viewMode === 'css' && (
          <pre className="m-0 select-text whitespace-pre">
            <code style={{ color: theme.palette.text }}>
              {cssRules}
            </code>
          </pre>
        )}

        {viewMode === 'inline' && (
          <pre className="m-0 select-text whitespace-pre" style={{ color: theme.palette.secondary }}>
            <code>
              {inlineStyle || `style="${cssRules.replace(/\n/g, ' ')}"`}
            </code>
          </pre>
        )}

        {viewMode === 'tailwind' && (
          <div className="space-y-2">
            <div className="text-[11px] font-semibold flex items-center gap-1" style={{ color: theme.palette.primary }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailwind CSS での対応クラス例:</span>
            </div>
            <pre 
              className="m-0 select-text whitespace-pre p-2.5 rounded-lg border"
              style={{
                backgroundColor: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                borderColor: theme.palette.border,
                color: theme.palette.primary,
              }}
            >
              <code>{tailwindTip}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Interactive hover notice */}
      <div 
        className="px-4 py-1.5 border-t flex items-center justify-between text-[11px]"
        style={{
          backgroundColor: theme.category === 'dark' ? '#0a101f' : '#f1f5f9',
          borderColor: theme.palette.border,
          color: theme.category === 'dark' ? '#94a3b8' : '#64748b',
        }}
      >
        <span>💡 スライダーを操作・ホバーすると対応するCSSがリアルタイムに更新されます</span>
        {highlightedToken && (
          <span className="font-bold font-mono" style={{ color: theme.palette.primary }}>
            選択中: {highlightedToken}
          </span>
        )}
      </div>
    </div>
  );
};
