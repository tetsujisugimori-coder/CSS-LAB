import React, { useState } from 'react';
import { 
  Palette, 
  Check, 
  Moon, 
  Sun, 
  Sparkles, 
  Layers, 
  Sliders, 
  Eye 
} from 'lucide-react';
import { UIStyle } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from './Modal';
import { getUIStyleClasses } from '../../utils/uiStyles';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { themeId, theme, setThemeId, uiStyle, setUiStyle, themes } = useTheme();
  const [activeTab, setActiveTab] = useState<'themes' | 'styles'>('themes');
  const uiClasses = getUIStyleClasses(uiStyle, theme);

  const UI_STYLES: { id: UIStyle; name: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'modern',
      name: 'Modern Futuristic (標準)',
      desc: '滑らかな角丸と洗練されたシャドウ、程よい光彩アクセントを持つ現代的なラボデザイン。',
      icon: <Sparkles className="w-5 h-5 text-sky-400" />,
    },
    {
      id: 'glass',
      name: 'Frosted Glass (すりガラス)',
      desc: 'backdrop-blurと半透明のカード、美しい光の屈折を感じさせるグラスモーフィズム。',
      icon: <Eye className="w-5 h-5 text-purple-400" />,
    },
    {
      id: 'neobrutal',
      name: 'Neo-Brutalism (太線＆影)',
      desc: '角丸のないソリッドなボックス、くっきりとした黒い枠線とオフセットシャドウが特徴的な現代アート調。',
      icon: <Sliders className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'minimal',
      name: 'Minimal Clean (極小・精緻)',
      desc: '装飾的なシャドウを排し、繊細な1pxのボーダーと研ぎ澄まされたフォントで魅せるミニマルデザイン。',
      icon: <Layers className="w-5 h-5 text-slate-400" />,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="デザインテーマ・セレクター"
      subtitle="お好みのデザイン候補をクリックするだけで、アプリ全体の配色と質感が瞬時に変わります (Escキーで閉じる)"
      icon={<Palette className="w-4 h-4" />}
      maxWidth="4xl"
      footer={
        <div className="w-full flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold" style={{ color: theme.palette.text }}>現在のテーマ:</span>
            <span 
              className="font-bold px-2 py-0.5 rounded"
              style={{ color: theme.palette.primary, backgroundColor: theme.category === 'dark' ? '#0f172a' : '#f1f5f9' }}
            >
              {theme.name}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 text-xs sm:text-sm font-bold transition shadow-lg cursor-pointer ${uiClasses.button}`}
          >
            完了（このデザインを適用）
          </button>
        </div>
      }
    >
      {/* Tab Switcher: Themes vs UI Styles */}
      <div 
        className="pt-1 pb-3 border-b flex items-center gap-4 text-xs sm:text-sm font-bold"
        style={{ borderColor: theme.palette.border }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('themes')}
          className={`pb-2 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'themes'
              ? 'border-sky-400 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          style={{
            borderColor: activeTab === 'themes' ? theme.palette.primary : 'transparent',
            color: activeTab === 'themes' ? theme.palette.primary : undefined,
          }}
        >
          <Palette className="w-4 h-4" />
          <span>1. カラーテーマ候補 (6種類)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('styles')}
          className={`pb-2 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'styles'
              ? 'border-sky-400 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          style={{
            borderColor: activeTab === 'styles' ? theme.palette.primary : 'transparent',
            color: activeTab === 'styles' ? theme.palette.primary : undefined,
          }}
        >
          <Layers className="w-4 h-4" />
          <span>2. UIスタイル・質感モード (4種類)</span>
        </button>
      </div>

      {/* Modal Body */}
      <div className="space-y-6">
        
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
                    className={`relative p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${uiClasses.subCard} ${
                      isSelected ? 'ring-2 ring-sky-400 border-sky-400 scale-[1.01]' : 'hover:border-slate-500'
                    }`}
                    style={{
                      borderColor: isSelected ? theme.palette.primary : undefined,
                    }}
                  >
                    {/* Top Bar inside card */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm sm:text-base" style={{ color: theme.palette.text }}>
                            {t.name}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 font-mono font-semibold flex items-center gap-1 ${uiClasses.badge}`}>
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
                            ? 'text-slate-950 shadow-md font-bold'
                            : 'text-transparent border border-slate-700'
                        }`}
                        style={{
                          backgroundColor: isSelected ? theme.palette.primary : 'transparent',
                        }}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Live Palette Dots & Mini Preview Bar */}
                    <div className="space-y-2 pt-2 border-t border-slate-700/40">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono">Palette & Accent</span>
                        <span className="font-mono" style={{ color: t.palette.primary }}>
                          {t.palette.primary}
                        </span>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex items-center gap-2">
                        <div
                          className="h-7 flex-1 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-sm"
                          style={{ backgroundColor: t.palette.primary }}
                        >
                          Primary
                        </div>
                        <div
                          className="h-7 flex-1 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-sm"
                          style={{ backgroundColor: t.palette.secondary }}
                        >
                          Secondary
                        </div>
                        <div
                          className="h-7 flex-1 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold border-slate-700"
                          style={{ backgroundColor: t.palette.bg, color: t.palette.text }}
                        >
                          BG
                        </div>
                        <div
                          className="h-7 flex-1 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold"
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
            <div className={`p-4 flex items-start gap-3 text-xs ${uiClasses.subCard}`}>
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: theme.palette.primary }} />
              <div className="space-y-1">
                <p className="font-bold" style={{ color: theme.palette.text }}>テーマはリアルタイムで記憶されます</p>
                <p className="text-slate-400 leading-relaxed">
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
                    className={`p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${uiClasses.subCard} ${
                      isSelected ? 'ring-2 ring-sky-400 border-sky-400 scale-[1.01]' : 'hover:border-slate-500'
                    }`}
                    style={{
                      borderColor: isSelected ? theme.palette.primary : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl border border-slate-700/50">
                          {style.icon}
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base" style={{ color: theme.palette.text }}>
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
                            ? 'text-slate-950 font-bold'
                            : 'text-transparent border border-slate-700'
                        }`}
                        style={{
                          backgroundColor: isSelected ? theme.palette.primary : 'transparent',
                        }}
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Visual UI Style Sample Card */}
                    <div className="pt-3 border-t border-slate-700/40">
                      {style.id === 'modern' && (
                        <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold" style={{ borderColor: theme.palette.border, backgroundColor: theme.category === 'dark' ? '#0f172a' : '#f8fafc', color: theme.palette.text }}>
                          <span>Modern Rounded Card</span>
                          <span className="px-2 py-0.5 rounded-md font-bold" style={{ backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(79, 70, 229, 0.1)', color: theme.palette.primary }}>
                            Radius 12px
                          </span>
                        </div>
                      )}
                      {style.id === 'glass' && (
                        <div className="p-2.5 rounded-xl border backdrop-blur-md flex items-center justify-between text-xs font-semibold" style={{ borderColor: theme.category === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', backgroundColor: theme.category === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)', color: theme.palette.text }}>
                          <span>Frosted Glass Effect</span>
                          <span className="px-2 py-0.5 rounded-md font-bold backdrop-blur" style={{ backgroundColor: theme.category === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)', color: theme.palette.primary }}>
                            Blur 12px
                          </span>
                        </div>
                      )}
                      {style.id === 'neobrutal' && (
                        <div className="p-2.5 rounded-none border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-between text-xs font-black" style={{ backgroundColor: '#fcd34d', color: '#000000' }}>
                          <span>NEO-BRUTAL BOLD</span>
                          <span className="px-2 py-0.5 bg-black text-white">
                            SHADOW 3px
                          </span>
                        </div>
                      )}
                      {style.id === 'minimal' && (
                        <div className="p-2.5 rounded-none border flex items-center justify-between text-xs font-mono" style={{ borderColor: theme.palette.border, color: theme.palette.text }}>
                          <span>Clean Flat Card</span>
                          <span className="text-slate-400">1px border</span>
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
    </Modal>
  );
};
