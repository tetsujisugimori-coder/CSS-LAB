import React, { useState } from 'react';
import { 
  Palette, 
  Check, 
  X, 
  Sparkles, 
  Sun, 
  Moon, 
  Layers, 
  Sliders, 
  Eye,
  Zap,
  Flame,
  Layout,
  Feather
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeId, UIStyle } from '../../types';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose }) => {
  const { themeId, setThemeId, themes, uiStyle, setUiStyle, theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'themes' | 'styles'>('themes');

  if (!isOpen) return null;

  const UI_STYLES: { id: UIStyle; name: string; nameEn: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'modern',
      name: 'Modern Balanced (標準・モダン)',
      nameEn: 'Rounded with Soft Depth',
      desc: 'ほどよい角丸と自然なシャドウの美しい現代的デザイン',
      icon: <Layout className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'glass',
      name: 'Glassmorphism (すりガラス)',
      nameEn: 'Backdrop Blur & Frost',
      desc: '半透明と背景ブラーを活かした透明感あふれる未来的デザイン',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'neobrutal',
      name: 'Neo-Brutalism (ネオ・ブルータリズム)',
      nameEn: 'Bold Borders & Hard Shadows',
      desc: '太い黒枠と硬いオフセット影、高コントラストなポップスタイル',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'minimal',
      name: 'Clean Minimal (クリーン・ミニマル)',
      nameEn: 'Flat & Crisp Lines',
      desc: '影を極力排し、極細ボーダーと余白で魅せるフラットデザイン',
      icon: <Feather className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 transition-colors"
        style={{
          backgroundColor: theme.category === 'dark' ? '#0f172a' : '#ffffff',
          borderColor: theme.palette.border,
          color: theme.palette.text,
        }}
      >
        {/* Modal Header */}
        <div 
          className="p-5 sm:p-6 border-b flex items-center justify-between flex-wrap gap-4"
          style={{ borderColor: theme.palette.border }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg font-bold"
              style={{ 
                backgroundColor: theme.palette.primary,
                color: theme.category === 'dark' ? '#0f172a' : '#ffffff' 
              }}
            >
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  デザインテーマ・候補セレクター
                </h2>
                <span 
                  className="text-xs px-2.5 py-0.5 rounded-full font-bold border"
                  style={{
                    backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(79, 70, 229, 0.1)',
                    color: theme.palette.primary,
                    borderColor: theme.palette.primary + '40',
                  }}
                >
                  6 Themes Available
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                お好みのデザイン候補をクリックするだけで、アプリ全体の配色と世界観が瞬時に変わります
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer border border-transparent hover:border-slate-700"
            title="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Themes vs UI Styles */}
        <div 
          className="px-6 pt-4 border-b flex items-center gap-4 text-xs sm:text-sm font-bold"
          style={{ borderColor: theme.palette.border }}
        >
          <button
            onClick={() => setActiveTab('themes')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'themes'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>1. カラーテーマ候補 (6種類)</span>
          </button>
          <button
            onClick={() => setActiveTab('styles')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'styles'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. UIスタイル・質感モード (4種類)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: Theme Presets */}
          {activeTab === 'themes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((t) => {
                  const isSelected = themeId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setThemeId(t.id)}
                      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col justify-between gap-4 ${
                        isSelected
                          ? 'border-sky-400 shadow-xl shadow-sky-500/15 scale-[1.01]'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80'
                      }`}
                      style={{
                        backgroundColor: isSelected 
                          ? (t.category === 'dark' ? '#0a101f' : '#f8fafc')
                          : undefined,
                      }}
                    >
                      {/* Top Bar inside card */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-base text-white group-hover:text-sky-300 transition">
                              {t.name}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold flex items-center gap-1 bg-slate-800 text-slate-300 border border-slate-700">
                              {t.category === 'dark' ? (
                                <Moon className="w-3 h-3 text-indigo-400" />
                              ) : (
                                <Sun className="w-3 h-3 text-amber-400" />
                              )}
                              <span>{t.category.toUpperCase()}</span>
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {t.description}
                          </p>
                        </div>

                        {/* Selected Checkmark Badge */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? 'bg-sky-400 text-slate-950 shadow-md font-bold'
                              : 'bg-slate-800/80 text-transparent border border-slate-700 group-hover:border-slate-600'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Live Palette Dots & Mini Preview Bar */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-mono">Palette & Accent</span>
                          <span className="font-mono" style={{ color: t.palette.primary }}>
                            {t.palette.primary}
                          </span>
                        </div>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-2">
                          <div
                            className="h-8 flex-1 rounded-xl shadow-inner border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-sm"
                            style={{ backgroundColor: t.palette.primary }}
                          >
                            Primary
                          </div>
                          <div
                            className="h-8 flex-1 rounded-xl shadow-inner border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-sm"
                            style={{ backgroundColor: t.palette.secondary }}
                          >
                            Secondary
                          </div>
                          <div
                            className="h-8 flex-1 rounded-xl shadow-inner border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold border-slate-700"
                            style={{ backgroundColor: t.palette.bg, color: t.palette.text }}
                          >
                            BG
                          </div>
                          <div
                            className="h-8 flex-1 rounded-xl shadow-inner border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold"
                            style={{ backgroundColor: t.palette.card, color: t.palette.text }}
                          >
                            Card
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Theme description hint */}
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/50 flex items-start gap-3 text-xs text-sky-200">
                <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">テーマはリアルタイムで記憶されます</p>
                  <p className="text-sky-300/80 leading-relaxed">
                    選択したテーマはブラウザに保存され、次回アクセス時もそのまま反映されます。ライトモード（Clean Modern Light / Soft Sakura Pastel）は明るい部屋での学習にも最適です。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UI Style Presets */}
          {activeTab === 'styles' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UI_STYLES.map((style) => {
                  const isSelected = uiStyle === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => setUiStyle(style.id)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                        isSelected
                          ? 'border-sky-400 shadow-xl shadow-sky-500/15 scale-[1.01] bg-slate-900'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                            {style.icon}
                          </div>
                          <div>
                            <div className="font-bold text-white text-base">
                              {style.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {style.desc}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? 'bg-sky-400 text-slate-950 font-bold'
                              : 'bg-slate-800 text-transparent border border-slate-700'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Visual UI Style Sample Card */}
                      <div className="pt-3 border-t border-slate-800">
                        {style.id === 'modern' && (
                          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 shadow-md flex items-center justify-between text-xs text-slate-200">
                            <span>Modern Rounded Card</span>
                            <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-bold">
                              Radius 12px
                            </span>
                          </div>
                        )}
                        {style.id === 'glass' && (
                          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between text-xs text-white">
                            <span>Frosted Glass Effect</span>
                            <span className="px-2 py-0.5 rounded-md bg-white/20 text-white font-bold backdrop-blur">
                              Blur 12px
                            </span>
                          </div>
                        )}
                        {style.id === 'neobrutal' && (
                          <div className="p-3 rounded-none bg-amber-400 text-slate-950 border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-between text-xs font-black">
                            <span>NEO-BRUTAL BOLD</span>
                            <span className="px-2 py-0.5 bg-black text-white">
                              SHADOW 4px
                            </span>
                          </div>
                        )}
                        {style.id === 'minimal' && (
                          <div className="p-3 rounded-none bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                            <span className="font-mono">Clean Flat Card</span>
                            <span className="font-mono text-slate-500">1px border</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div 
          className="p-4 sm:p-5 border-t bg-slate-950/60 flex items-center justify-between flex-wrap gap-3"
          style={{ borderColor: theme.palette.border }}
        >
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">現在のテーマ:</span>
            <span 
              className="font-bold px-2 py-0.5 rounded"
              style={{ color: theme.palette.primary, backgroundColor: theme.palette.card }}
            >
              {theme.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 transition shadow-lg cursor-pointer hover:opacity-95 active:scale-95"
            style={{ backgroundColor: theme.palette.primary }}
          >
            完了（このデザインを適用）
          </button>
        </div>
      </div>
    </div>
  );
};
