import React from 'react';
import { ArrowUp, ArrowDown, Columns2, Pin, PinOff, Layout } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export type PreviewLayout = 'side' | 'top' | 'bottom';

interface PreviewPositionToolbarProps {
  layout: PreviewLayout;
  onChangeLayout: (layout: PreviewLayout) => void;
  isSticky?: boolean;
  onToggleSticky?: (sticky: boolean) => void;
  compact?: boolean;
}

export const PreviewPositionToolbar: React.FC<PreviewPositionToolbarProps> = ({
  layout,
  onChangeLayout,
  isSticky = false,
  onToggleSticky,
  compact = false,
}) => {
  const { theme } = useTheme();

  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800 text-xs">
        <span className="text-[10px] text-slate-400 px-1 font-medium select-none">位置:</span>
        <button
          type="button"
          onClick={() => onChangeLayout('top')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
            layout === 'top'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
          title="プレビュー枠を最上部に移動（下部の操作項目を見ながら確認）"
        >
          <ArrowUp className="w-3 h-3" />
          <span>上部</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeLayout('side')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
            layout === 'side'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
          title="プレビュー枠を右側に並列配置（標準レイアウト）"
        >
          <Columns2 className="w-3 h-3" />
          <span>並列</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeLayout('bottom')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
            layout === 'bottom'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
          title="プレビュー枠を最下部に移動（下部スライダーのすぐ隣で確認）"
        >
          <ArrowDown className="w-3 h-3" />
          <span>下部</span>
        </button>
        {onToggleSticky && layout === 'side' && (
          <button
            type="button"
            onClick={() => onToggleSticky(!isSticky)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ml-1 border ${
              isSticky
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-900'
            }`}
            title={isSticky ? 'スクロール追従を解除' : 'スクロールしてもプレビューを画面上部に追従固定'}
          >
            {isSticky ? <Pin className="w-3 h-3 text-amber-400" /> : <PinOff className="w-3 h-3" />}
            <span>{isSticky ? '追従中' : '追従'}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
      <div className="flex items-center gap-2">
        <Layout className="w-4 h-4 text-sky-400" />
        <span className="font-bold text-slate-300">プレビュー枠の配置・移動:</span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          操作項目に合わせてプレビューの位置を上下に移動できます
        </span>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
        <button
          type="button"
          onClick={() => onChangeLayout('top')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
            layout === 'top'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>上部に配置</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeLayout('side')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
            layout === 'side'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Columns2 className="w-3.5 h-3.5" />
          <span>左右並列 (標準)</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeLayout('bottom')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
            layout === 'bottom'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>下部に配置</span>
        </button>

        {onToggleSticky && layout === 'side' && (
          <button
            type="button"
            onClick={() => onToggleSticky(!isSticky)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ml-1 border ${
              isSticky
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-900'
            }`}
            title={isSticky ? 'スクロール追従を解除' : 'スクロールしてもプレビューを画面上部に追従固定'}
          >
            {isSticky ? <Pin className="w-3.5 h-3.5 text-amber-400" /> : <PinOff className="w-3.5 h-3.5" />}
            <span>{isSticky ? '📌 画面追従中' : '📌 画面追従'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
