import { UIStyle } from '../types';

export interface StyleClasses {
  card: string;
  button: string;
  badge: string;
  header: string;
  input: string;
}

export function getUIStyleClasses(style: UIStyle): StyleClasses {
  switch (style) {
    case 'glass':
      return {
        card: 'bg-slate-900/60 backdrop-blur-xl border border-white/15 shadow-2xl shadow-purple-950/20 rounded-2xl transition-all',
        button: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-xl shadow-md transition-all active:scale-95',
        badge: 'bg-white/15 text-sky-200 border border-white/20 rounded-full backdrop-blur-sm',
        header: 'border-b border-white/10 pb-3',
        input: 'bg-white/5 border border-white/15 rounded-xl text-white backdrop-blur-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400',
      };
    case 'neobrutal':
      return {
        card: 'bg-slate-900 border-2 border-slate-700 shadow-[5px_5px_0px_#38bdf8] rounded-none transition-all',
        button: 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-black border-2 border-black shadow-[3px_3px_0px_#000] rounded-none transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none',
        badge: 'bg-amber-400 text-slate-950 font-black border border-black shadow-[2px_2px_0px_#000] rounded-none',
        header: 'border-b-2 border-slate-800 pb-3 font-black',
        input: 'bg-slate-950 border-2 border-slate-700 rounded-none text-white focus:border-sky-400 focus:shadow-[2px_2px_0px_#38bdf8]',
      };
    case 'minimal':
      return {
        card: 'bg-slate-950 border border-slate-800/80 shadow-none rounded-lg transition-all',
        button: 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-md shadow-none transition-all active:scale-95',
        badge: 'bg-slate-900 text-slate-400 border border-slate-800 rounded-sm font-mono text-[10px]',
        header: 'border-b border-slate-800/80 pb-3',
        input: 'bg-slate-950 border border-slate-800 rounded-md text-slate-200 focus:border-slate-600 focus:ring-0',
      };
    case 'modern':
    default:
      return {
        card: 'bg-slate-900/90 border border-slate-800 shadow-xl rounded-2xl transition-all',
        button: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-95',
        badge: 'bg-sky-950 text-sky-400 border border-sky-900/60 rounded-md font-mono',
        header: 'border-b border-slate-800 pb-3',
        input: 'bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500',
      };
  }
}
