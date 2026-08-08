import React, { useState } from 'react';
import { 
  Square, 
  Box, 
  Move, 
  Sparkles, 
  Palette, 
  HelpCircle, 
  CheckCircle2, 
  BookOpen, 
  Layers,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { LabType, LabInfo } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  activeLab: LabType;
  onSelectLab: (lab: LabType) => void;
  onOpenCheatSheet: () => void;
  onOpenQuiz: () => void;
  onOpenThemeSelector: () => void;
}

export const LABS: LabInfo[] = [
  {
    id: 'border-radius',
    name: 'Border Radius',
    nameEn: 'Corner Radius Lab',
    property: 'border-radius',
    icon: 'Square',
    description: '四角形の角を丸める仕組みと数値を理解する',
    badge: '角丸',
  },
  {
    id: 'box-shadow',
    name: 'Box Shadow',
    nameEn: 'Elevation & Shadow Lab',
    property: 'box-shadow',
    icon: 'Box',
    description: 'X/Y・ぼかし・広がり・色でリアルな立体感を表現する',
    badge: '影・立体感',
  },
  {
    id: 'transform',
    name: 'Transform',
    nameEn: '2D Transformation Lab',
    property: 'transform',
    icon: 'Move',
    description: '回転・拡大縮小・移動・歪み・原点の変形を学ぶ',
    badge: '変形・配置',
  },
  {
    id: 'filter',
    name: 'Filter',
    nameEn: 'Visual Effects Lab',
    property: 'filter',
    icon: 'Sparkles',
    description: 'ぼかし・明暗・白黒・色相回転で画像を加工する',
    badge: '画像効果',
  },
  {
    id: 'gradient',
    name: 'Gradient',
    nameEn: 'Color Transitions Lab',
    property: 'background: gradient',
    icon: 'Palette',
    description: 'linear・radial・conicの美しい色のグラデーション',
    badge: 'グラデーション',
  },
];

export const Header: React.FC<HeaderProps> = ({
  activeLab,
  onSelectLab,
  onOpenCheatSheet,
  onOpenQuiz,
  onOpenThemeSelector,
}) => {
  const { theme, themes, themeId, setThemeId } = useTheme();
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  return (
    <header 
      className="border-b sticky top-0 z-40 shadow-lg transition-colors duration-200"
      style={{
        backgroundColor: theme.category === 'dark' ? '#0f172a' : '#ffffff',
        borderColor: theme.palette.border,
      }}
    >
      {/* Top Banner with Branding & Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md font-bold text-lg ring-2 ring-white/20 transition-colors"
              style={{
                backgroundColor: theme.palette.primary,
                color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
              }}
            >
              <Layers className="w-5 h-5 text-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5" style={{ color: theme.palette.text }}>
                  CSS <span style={{ color: theme.palette.primary }}>LAB</span>
                </h1>
                <span 
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(79, 70, 229, 0.08)',
                    color: theme.palette.primary,
                    borderColor: theme.palette.primary + '40',
                  }}
                >
                  v2.0 学習実験室
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                触って、変えて、CSSを理解する実験室
              </p>
            </div>
          </div>

          {/* Quick Learning Utility & Theme Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {/* Theme Selector Button */}
            <div className="relative">
              <button
                onClick={onOpenThemeSelector}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.category === 'dark' ? '#1e293b' : '#f1f5f9',
                  borderColor: theme.palette.border,
                  color: theme.palette.text,
                }}
                title="デザインテーマの候補一覧と切り替え"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: theme.palette.primary }} />
                <span>デザイン: {theme.name.split(' ')[0]}</span>
                <span 
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20 ml-0.5 inline-block"
                  style={{ backgroundColor: theme.palette.primary }}
                />
              </button>
            </div>

            <button
              onClick={onOpenCheatSheet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition shadow-sm active:scale-95 cursor-pointer"
              style={{
                backgroundColor: theme.category === 'dark' ? '#1e293b' : '#f1f5f9',
                borderColor: theme.palette.border,
                color: theme.palette.text,
              }}
              title="CSSプロパティ早見表を見る"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>早見表</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
              style={{
                backgroundColor: theme.palette.primary,
                color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
              }}
              title="理解度チェッククイズに挑戦する"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>理解度クイズ</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs for the 5 Labs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2.5 pt-1 scrollbar-none">
          {LABS.map((lab, index) => {
            const isActive = activeLab === lab.id;
            return (
              <button
                key={lab.id}
                onClick={() => onSelectLab(lab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none border ${
                  isActive
                    ? 'shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(79, 70, 229, 0.1)',
                        color: theme.palette.primary,
                        borderColor: theme.palette.primary + '50',
                      }
                    : undefined
                }
              >
                <span 
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: isActive ? theme.palette.primary : '#334155',
                    color: isActive ? (theme.category === 'dark' ? '#0f172a' : '#ffffff') : '#94a3b8',
                  }}
                >
                  {index + 1}
                </span>
                <span>{lab.name}</span>
                <span 
                  className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-mono border"
                  style={{
                    backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.05)',
                    borderColor: isActive ? theme.palette.primary + '40' : 'transparent',
                    color: isActive ? theme.palette.primary : '#94a3b8',
                  }}
                >
                  {lab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
