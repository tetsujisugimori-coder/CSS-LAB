import React from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { getUIStyleClasses } from '../../utils/uiStyles';

interface SliderControlProps {
  label: string;
  propertyKey?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  description?: string;
  quickValues?: number[];
  onHoverToken?: (propKey?: string) => void;
  isHighlighted?: boolean;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  label,
  propertyKey,
  value,
  min,
  max,
  step = 1,
  unit = 'px',
  onChange,
  description,
  quickValues,
  onHoverToken,
  isHighlighted = false,
}) => {
  const { theme, uiStyle } = useTheme();
  const uiClasses = getUIStyleClasses(uiStyle, theme);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      const clamped = Math.max(min, Math.min(max, num));
      onChange(clamped);
    }
  };

  const handleStep = (direction: 'up' | 'down') => {
    const delta = direction === 'up' ? step : -step;
    const nextVal = Math.round((value + delta) * 100) / 100;
    const clamped = Math.max(min, Math.min(max, nextVal));
    onChange(clamped);
  };

  const triggerHover = () => {
    if (onHoverToken && propertyKey) {
      onHoverToken(propertyKey);
    }
  };

  const clearHover = () => {
    if (onHoverToken) {
      onHoverToken(undefined);
    }
  };

  return (
    <div
      className={`p-3 border transition-all ${uiClasses.subCard} ${
        isHighlighted
          ? 'ring-2 ring-sky-400 border-sky-400 scale-[1.01] shadow-lg'
          : 'hover:border-slate-500'
      }`}
      style={{
        borderColor: isHighlighted ? theme.palette.primary : undefined,
      }}
      onMouseEnter={triggerHover}
      onMouseLeave={clearHover}
    >
      {/* Header: Label, Monospace property name, and Number Input */}
      <div className="flex items-center justify-between gap-1.5 mb-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <label className="text-xs font-bold" style={{ color: theme.palette.text }}>
            {label}
          </label>
          {propertyKey && (
            <code 
              className={`text-[10px] font-mono font-medium px-1.5 py-0.5 shrink-0 ${uiClasses.badge}`}
              style={{
                color: theme.palette.primary,
              }}
            >
              {propertyKey}
            </code>
          )}
        </div>

        {/* Stepper & Direct numeric input */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => handleStep('down')}
            onFocus={triggerHover}
            onBlur={clearHover}
            className={`w-5 h-5 min-w-[20px] min-h-[20px] rounded flex items-center justify-center text-xs transition active:scale-90 cursor-pointer border shrink-0 ${uiClasses.buttonSecondary}`}
            title="値を減らす"
            aria-label={`${label}の値を減らす`}
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <div className="relative flex items-center shrink-0">
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleInputChange}
              onFocus={triggerHover}
              onBlur={clearHover}
              className={`w-14 min-w-[3.5rem] px-1 py-0.5 text-right text-xs font-mono font-bold border rounded focus:outline-none ${uiClasses.input}`}
              aria-label={`${label}の数値入力`}
            />
            <span className="ml-1 text-[10px] font-mono text-slate-400 select-none">
              {unit}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleStep('up')}
            onFocus={triggerHover}
            onBlur={clearHover}
            className={`w-5 h-5 min-w-[20px] min-h-[20px] rounded flex items-center justify-center text-xs transition active:scale-90 cursor-pointer border shrink-0 ${uiClasses.buttonSecondary}`}
            title="値を増やす"
            aria-label={`${label}の値を増やす`}
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Slider Bar */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-slate-400 w-8 text-left">
          {min}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onFocus={triggerHover}
          onBlur={clearHover}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            accentColor: theme.palette.primary,
            backgroundColor: theme.category === 'dark' ? '#1e293b' : '#e2e8f0',
          }}
          aria-label={label}
        />
        <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
          {max}
        </span>
      </div>

      {/* Quick preset pills if available */}
      {quickValues && quickValues.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <span className="text-[10px] text-slate-400 font-medium">プリセット:</span>
          {quickValues.map((qv) => {
            const isCurrent = value === qv;
            return (
              <button
                key={qv}
                type="button"
                onClick={() => onChange(qv)}
                onFocus={triggerHover}
                onBlur={clearHover}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono transition cursor-pointer border"
                style={{
                  backgroundColor: isCurrent ? theme.palette.primary : (theme.category === 'dark' ? '#1e293b' : '#f1f5f9'),
                  color: isCurrent ? (theme.category === 'dark' ? '#0f172a' : '#ffffff') : theme.palette.text,
                  borderColor: isCurrent ? theme.palette.primary : theme.palette.border,
                  fontWeight: isCurrent ? 'bold' : 'normal',
                }}
              >
                {qv}{unit}
              </button>
            );
          })}
        </div>
      )}

      {/* Beginner Explanation / Educational note */}
      {description && (
        <div 
          className="mt-2 text-[11px] p-2 rounded-lg border flex items-start gap-1.5"
          style={{
            backgroundColor: theme.category === 'dark' ? '#020617' : '#f8fafc',
            borderColor: theme.palette.border,
            color: theme.category === 'dark' ? '#94a3b8' : '#64748b',
          }}
        >
          <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: theme.palette.primary }} />
          <span>{description}</span>
        </div>
      )}
    </div>
  );
};
