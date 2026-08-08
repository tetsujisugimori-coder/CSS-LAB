/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LabType } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { CheatSheetModal } from './components/common/CheatSheetModal';
import { QuizModal } from './components/common/QuizModal';
import { ThemeSelectorModal } from './components/common/ThemeSelectorModal';
import { BorderRadiusLab } from './components/labs/BorderRadiusLab';
import { BoxShadowLab } from './components/labs/BoxShadowLab';
import { TransformLab } from './components/labs/TransformLab';
import { FilterLab } from './components/labs/FilterLab';
import { GradientLab } from './components/labs/GradientLab';
import { 
  Square, 
  Box, 
  Move, 
  Sparkles, 
  Palette, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Zap, 
  GraduationCap
} from 'lucide-react';

function AppContent() {
  const [activeLab, setActiveLab] = useState<LabType>('border-radius');
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div 
      className="min-h-screen font-sans flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: theme.palette.bg,
        color: theme.palette.text,
      }}
    >
      {/* Top Header */}
      <Header
        activeLab={activeLab}
        onSelectLab={(lab) => setActiveLab(lab)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenThemeSelector={() => setIsThemeSelectorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Lab View Switcher */}
        {activeLab === 'border-radius' && <BorderRadiusLab />}
        {activeLab === 'box-shadow' && <BoxShadowLab />}
        {activeLab === 'transform' && <TransformLab />}
        {activeLab === 'filter' && <FilterLab />}
        {activeLab === 'gradient' && <GradientLab />}

        {/* Global Learning Banner at Bottom */}
        <section 
          className="border rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors"
          style={{
            backgroundColor: theme.category === 'dark' ? '#0f172a' : '#ffffff',
            borderColor: theme.palette.border,
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0"
              style={{
                backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(79, 70, 229, 0.1)',
                color: theme.palette.primary,
                borderColor: theme.palette.primary + '40',
              }}
            >
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold" style={{ color: theme.palette.text }}>
                CSS LABで学ぶ「操作 → 見た目 → コード」の因果関係
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                各実験室でスライダーを動かすと、リアルタイムにCSSコードと視覚効果が同期します。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto flex-wrap">
            <button
              onClick={() => setIsThemeSelectorOpen(true)}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl border text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: theme.category === 'dark' ? '#1e293b' : '#f1f5f9',
                borderColor: theme.palette.border,
                color: theme.palette.text,
              }}
            >
              <Palette className="w-4 h-4" style={{ color: theme.palette.primary }} />
              <span>デザイン変更 (6候補)</span>
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: theme.palette.primary,
                color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
              }}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>理解度クイズで試す</span>
            </button>
            <button
              onClick={() => setIsCheatSheetOpen(true)}
              className="flex-1 md:flex-initial px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: theme.category === 'dark' ? '#1e293b' : '#f1f5f9',
                borderColor: theme.palette.border,
                color: theme.palette.text,
              }}
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>CSS早見表</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer 
        className="border-t py-6 text-center text-xs transition-colors"
        style={{
          backgroundColor: theme.category === 'dark' ? '#0f172a' : '#ffffff',
          borderColor: theme.palette.border,
          color: theme.palette.text,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-mono">
            <span className="font-bold" style={{ color: theme.palette.primary }}>CSS LAB</span>
            <span>-</span>
            <span className="text-slate-400">触って、変えて、CSSを理解する実験室</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Border Radius / Box Shadow / Transform / Filter / Gradient インタラクティブ学習環境
          </p>
        </div>
      </footer>

      {/* Cheat Sheet, Quiz & Theme Selector Modals */}
      <ThemeSelectorModal
        isOpen={isThemeSelectorOpen}
        onClose={() => setIsThemeSelectorOpen(false)}
      />

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onSelectLab={(lab) => setActiveLab(lab)}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectLab={(lab) => setActiveLab(lab)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
