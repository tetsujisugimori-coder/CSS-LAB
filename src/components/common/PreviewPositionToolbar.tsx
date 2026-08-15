import React from 'react';
import { ArrowUp, ArrowDown, Columns2, Pin, PinOff, Layout } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { getUIStyleClasses } from '../../utils/uiStyles';

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
  const { theme, uiStyle } = useTheme();
  const uiClasses = getUIStyleClasses(uiStyle, theme);
  const textMuted = theme.category === 'dark' ? '#94a3b8' : '#64748b';

  if (compact) {
    return (
      <div
        className="flex items-center gap-1 p-1 rounded-xl border text-xs"
        style={{
          backgroundColor: theme.category === 'dark' ? '#020617' : '#f8fafc',
          borderColor: theme.palette.border,
        }}
      >
        <span
          className="text-[10px] px-1 font-medium select-none"
          style={{ color: textMuted }}
        >
          位置:
        </span>
        <button
          type="button"
          onClick={() => onChangeLayout('top')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
            layout === 'top' ? 'shadow-sm' : ''
          }`}
          style={
            layout === 'top'
              ? {
                  backgroundColor: theme.palette.primary,
                  color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                }
              : {
                  color: textMuted,
                }
          }
          title="プレビュー枠を最上部に移動（下部の操作項目を見ながら確認）"
        >
          <ArrowUp className="w-3 h-3" />
          <span>上部</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeLayout('side')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
            layout === 'side' ? 'shadow-sm' : ''
          }`}
          style={
            layout === 'side'
              ? {
                  backgroundColor: theme.palette.primary,
                  color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                }
              : {
                  color: textMuted,
                }
          }
          title="プレビュー枠を右側に並列配置（標準レイアウト）"
        >
          <Columns2 className="w-3 h-3" />
          <span>並列</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeLayout('bottom')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
            layout === 'bottom' ? 'shadow-sm' : ''
          }`}
          style={
            layout === 'bottom'
              ? {
                  backgroundColor: theme.palette.primary,
                  color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                }
              : {
                  color: textMuted,
                }
          }
          title="プレビュー枠を最下部に移動（下部スライダーのすぐ隣で確認）"
        >
          <ArrowDown className="w-3 h-3" />
          <span>下部</span>
        </button>
        {onToggleSticky && layout === 'side' && (
          <button
            type="button"
            onClick={() => onToggleSticky(!isSticky)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold text-[11px] transition cursor-pointer ml-1 border"
            style={
              isSticky
                ? {
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    color: '#f59e0b',
                    borderColor: 'rgba(245, 158, 11, 0.4)',
                  }
                : {
                    color: textMuted,
                    borderColor: theme.palette.border,
                  }
            }
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
    <div
      className={`flex items-center justify-between flex-wrap gap-2 p-2.5 border text-xs ${uiClasses.panel}`}
      style={{
        borderColor: theme.palette.border,
      }}
    >
      <div className="flex items-center gap-2">
        <Layout className="w-4 h-4" style={{ color: theme.palette.primary }} />
        <span className="font-bold" style={{ color: theme.palette.text }}>
          プレビュー枠の配置・移動:
        </span>
        <span
          className="text-[11px] hidden sm:inline"
          style={{ color: textMuted }}
        >
          操作項目に合わせてプレビューの位置を上下に移動できます
        </span>
      </div>

      <div
        className="flex items-center gap-1.5 p-1 rounded-xl border"
        style={{
          backgroundColor: theme.category === 'dark' ? '#020617' : '#f8fafc',
          borderColor: theme.palette.border,
        }}
      >
        <button
          type="button"
          onClick={() => onChangeLayout('top')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
            layout === 'top' ? 'shadow-sm' : ''
          }`}
          style={
            layout === 'top'
              ? {
                  backgroundColor: theme.palette.primary,
                  color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                }
              : {
                  color: textMuted,
                }
          }
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>上部に配置</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeLayout('side')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
            layout === 'side' ? 'shadow-sm' : ''
          }`}
          style={
            layout === 'side'
              ? {
                  backgroundColor: theme.palette.primary,
                  color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                }
              : {
                  color: textMuted,
                }
          }
        >
          <Columns2 className="w-3.5 h-3.5" />
          <span>左右並列 (標準)</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeLayout('bottom')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
            layout === 'bottom' ? 'shadow-sm' : ''
          }`}
          style={
            layout === 'bottom'
              ? {
                  backgroundColor: theme.palette.primary,
                  color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                }
              : {
                  color: textMuted,
                }
          }
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>下部に配置</span>
        </button>

        {onToggleSticky && layout === 'side' && (
          <button
            type="button"
            onClick={() => onToggleSticky(!isSticky)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ml-1 border"
            style={
              isSticky
                ? {
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    color: '#f59e0b',
                    borderColor: 'rgba(245, 158, 11, 0.4)',
                  }
                : {
                    color: textMuted,
                    borderColor: theme.palette.border,
                  }
            }
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
