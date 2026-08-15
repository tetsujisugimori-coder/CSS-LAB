import { UIStyle, ThemeConfig } from '../types';

export interface StyleClasses {
  card: string;
  subCard: string;
  button: string;
  buttonSecondary: string;
  badge: string;
  header: string;
  input: string;
  panel: string;
  modal: string;
}

export function getUIStyleClasses(style: UIStyle, theme?: ThemeConfig): StyleClasses {
  const isDark = theme ? theme.category === 'dark' : true;

  switch (style) {
    case 'glass':
      return {
        card: isDark
          ? 'bg-slate-900/60 backdrop-blur-xl border border-white/15 shadow-2xl shadow-purple-950/20 rounded-2xl transition-all'
          : 'bg-white/70 backdrop-blur-xl border border-slate-900/10 shadow-xl shadow-slate-900/5 rounded-2xl transition-all',
        subCard: isDark
          ? 'bg-white/5 backdrop-blur-md border border-white/10 rounded-xl'
          : 'bg-black/5 backdrop-blur-md border border-black/5 rounded-xl',
        button: isDark
          ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-xl shadow-md transition-all active:scale-95'
          : 'bg-slate-900/10 hover:bg-slate-900/15 text-slate-900 backdrop-blur-md border border-slate-900/10 rounded-xl shadow-sm transition-all active:scale-95',
        buttonSecondary: isDark
          ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl'
          : 'bg-black/5 hover:bg-black/10 text-slate-700 border border-black/10 rounded-xl',
        badge: isDark
          ? 'bg-white/15 text-sky-200 border border-white/20 rounded-full backdrop-blur-sm'
          : 'bg-slate-900/10 text-slate-800 border border-slate-900/15 rounded-full backdrop-blur-sm',
        header: isDark
          ? 'border-b border-white/10 pb-3'
          : 'border-b border-slate-900/10 pb-3',
        input: isDark
          ? 'bg-white/5 border border-white/15 rounded-xl text-white backdrop-blur-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
          : 'bg-black/5 border border-black/10 rounded-xl text-slate-900 backdrop-blur-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
        panel: isDark
          ? 'bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl'
          : 'bg-white/60 backdrop-blur-lg border border-slate-900/10 rounded-xl',
        modal: isDark
          ? 'bg-slate-900/90 backdrop-blur-2xl border border-white/15 text-white'
          : 'bg-white/90 backdrop-blur-2xl border border-slate-900/15 text-slate-900',
      };

    case 'neobrutal':
      return {
        card: isDark
          ? 'bg-slate-900 border-2 border-slate-200 shadow-[5px_5px_0px_#38bdf8] rounded-none transition-all'
          : 'bg-white border-2 border-black shadow-[5px_5px_0px_#000] rounded-none transition-all',
        subCard: isDark
          ? 'bg-slate-950 border-2 border-slate-700 rounded-none'
          : 'bg-slate-50 border-2 border-black rounded-none',
        button: isDark
          ? 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-black border-2 border-white shadow-[3px_3px_0px_#fff] rounded-none transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
          : 'bg-amber-300 hover:bg-amber-400 text-black font-black border-2 border-black shadow-[3px_3px_0px_#000] rounded-none transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
        buttonSecondary: isDark
          ? 'bg-slate-800 hover:bg-slate-700 text-white font-bold border-2 border-slate-400 shadow-[2px_2px_0px_#38bdf8] rounded-none'
          : 'bg-white hover:bg-slate-100 text-black font-bold border-2 border-black shadow-[2px_2px_0px_#000] rounded-none',
        badge: isDark
          ? 'bg-amber-400 text-slate-950 font-black border-2 border-white shadow-[2px_2px_0px_#fff] rounded-none'
          : 'bg-amber-300 text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] rounded-none',
        header: isDark
          ? 'border-b-2 border-slate-700 pb-3 font-black'
          : 'border-b-2 border-black pb-3 font-black',
        input: isDark
          ? 'bg-slate-950 border-2 border-slate-300 rounded-none text-white focus:border-sky-400 focus:shadow-[2px_2px_0px_#38bdf8]'
          : 'bg-white border-2 border-black rounded-none text-black focus:border-black focus:shadow-[2px_2px_0px_#000]',
        panel: isDark
          ? 'bg-slate-900 border-2 border-slate-600 shadow-[3px_3px_0px_#38bdf8] rounded-none'
          : 'bg-white border-2 border-black shadow-[3px_3px_0px_#000] rounded-none',
        modal: isDark
          ? 'bg-slate-900 border-4 border-white shadow-[8px_8px_0px_#38bdf8] rounded-none text-white'
          : 'bg-white border-4 border-black shadow-[8px_8px_0px_#000] rounded-none text-black',
      };

    case 'minimal':
      return {
        card: isDark
          ? 'bg-slate-950 border border-slate-800 shadow-none rounded-lg transition-all'
          : 'bg-white border border-slate-200 shadow-none rounded-lg transition-all',
        subCard: isDark
          ? 'bg-slate-900/60 border border-slate-800/80 rounded-md'
          : 'bg-slate-50 border border-slate-200/80 rounded-md',
        button: isDark
          ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-md shadow-none transition-all active:scale-95'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-md shadow-none transition-all active:scale-95',
        buttonSecondary: isDark
          ? 'bg-transparent hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-md'
          : 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md',
        badge: isDark
          ? 'bg-slate-900 text-slate-400 border border-slate-800 rounded-sm font-mono text-[10px]'
          : 'bg-slate-100 text-slate-600 border border-slate-200 rounded-sm font-mono text-[10px]',
        header: isDark
          ? 'border-b border-slate-800/80 pb-3'
          : 'border-b border-slate-200 pb-3',
        input: isDark
          ? 'bg-slate-950 border border-slate-800 rounded-md text-slate-200 focus:border-slate-600 focus:ring-0'
          : 'bg-white border border-slate-300 rounded-md text-slate-900 focus:border-slate-500 focus:ring-0',
        panel: isDark
          ? 'bg-slate-950 border border-slate-800 rounded-md'
          : 'bg-white border border-slate-200 rounded-md',
        modal: isDark
          ? 'bg-slate-950 border border-slate-800 rounded-lg text-slate-100'
          : 'bg-white border border-slate-200 rounded-lg text-slate-900',
      };

    case 'modern':
    default:
      return {
        card: isDark
          ? 'bg-slate-900/90 border border-slate-800 shadow-xl rounded-2xl transition-all'
          : 'bg-white border border-slate-200/80 shadow-xl rounded-2xl transition-all',
        subCard: isDark
          ? 'bg-slate-950/80 border border-slate-800/80 rounded-xl'
          : 'bg-slate-50 border border-slate-200/60 rounded-xl',
        button: isDark
          ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-95'
          : 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all active:scale-95',
        buttonSecondary: isDark
          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl',
        badge: isDark
          ? 'bg-sky-950 text-sky-400 border border-sky-900/60 rounded-md font-mono'
          : 'bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-mono',
        header: isDark
          ? 'border-b border-slate-800 pb-3'
          : 'border-b border-slate-100 pb-3',
        input: isDark
          ? 'bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
          : 'bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
        panel: isDark
          ? 'bg-slate-900/80 border border-slate-800 rounded-xl'
          : 'bg-white/80 border border-slate-200 rounded-xl',
        modal: isDark
          ? 'bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl text-slate-100'
          : 'bg-white border border-slate-200 shadow-2xl rounded-2xl text-slate-900',
      };
  }
}
