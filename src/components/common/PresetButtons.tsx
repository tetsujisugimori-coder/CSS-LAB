import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Preset } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { getUIStyleClasses } from '../../utils/uiStyles';

export interface PresetButtonsProps<T> {
  presets: Preset<T>[];
  onSelectPreset: (presetState: Partial<T>, presetId?: string) => void;
  onReset: () => void;
  currentPresetId?: string;
}

export function PresetButtons<T>({
  presets,
  onSelectPreset,
  onReset,
  currentPresetId,
}: PresetButtonsProps<T>) {
  const { theme, uiStyle } = useTheme();
  const uiClasses = getUIStyleClasses(uiStyle, theme);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 p-3 border transition-all ${uiClasses.panel}`}
      style={{
        borderColor: theme.palette.border,
      }}
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        <div
          className="flex items-center gap-1 text-xs font-bold mr-1"
          style={{ color: theme.palette.primary }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>プリセット:</span>
        </div>

        {presets.map((preset) => {
          const isActive = currentPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.state, preset.id)}
              className={`px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'font-bold shadow-md ring-2'
                  : uiClasses.buttonSecondary
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: theme.palette.primary,
                      color: theme.category === 'dark' ? '#0f172a' : '#ffffff',
                      borderColor: theme.palette.primary,
                      boxShadow: `0 4px 12px ${theme.palette.primary}40`,
                    }
                  : undefined
              }
              title={preset.description}
              aria-pressed={isActive}
            >
              {preset.previewColor && (
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                  style={{ background: preset.previewColor }}
                />
              )}
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Reset button */}
      <button
        type="button"
        onClick={onReset}
        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition active:scale-95 cursor-pointer ml-auto hover:text-rose-400 ${uiClasses.buttonSecondary}`}
        title="初期値にリセット"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>初期値に戻す</span>
      </button>
    </div>
  );
}
