import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Preset } from '../../types';

interface PresetButtonsProps<T> {
  presets: Preset<T>[];
  onSelectPreset: (presetState: Partial<T>) => void;
  onReset: () => void;
  currentPresetId?: string;
}

export function PresetButtons<T>({
  presets,
  onSelectPreset,
  onReset,
  currentPresetId,
}: PresetButtonsProps<T>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
      <div className="flex items-center gap-1.5 flex-wrap">
        <div className="flex items-center gap-1 text-xs font-bold text-sky-400 mr-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>プリセット:</span>
        </div>

        {presets.map((preset) => {
          const isActive = currentPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.state)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20 ring-1 ring-sky-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/60'
              }`}
              title={preset.description}
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
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800/60 text-xs font-semibold transition active:scale-95 cursor-pointer ml-auto"
        title="初期値にリセット"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>初期値に戻す</span>
      </button>
    </div>
  );
}
