import React, { useState } from 'react';
import { 
  Move, 
  RotateCw, 
  Maximize, 
  Compass, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Crosshair,
  Maximize2
} from 'lucide-react';
import { TransformState, Preset } from '../../types';
import { SliderControl } from '../common/SliderControl';
import { CodePanel } from '../common/CodePanel';
import { PresetButtons } from '../common/PresetButtons';
import { PreviewPositionToolbar } from '../common/PreviewPositionToolbar';
import { PropertyExplanationCard, BreakdownItem } from '../common/PropertyExplanationCard';

const INITIAL_STATE: TransformState = {
  rotate: 15,
  scale: 1.05,
  scaleX: 1,
  scaleY: 1,
  isUniformScale: true,
  translateX: 10,
  translateY: -10,
  skewX: 4,
  skewY: 0,
  origin: 'center',
  showGhostOutline: true,
  showGrid: true,
};

const PRESETS: Preset<TransformState>[] = [
  {
    id: 'rotate',
    name: 'Rotate (回転 30°)',
    description: '要素を中心を軸に30度右回転',
    previewColor: '#38bdf8',
    state: { rotate: 30, scale: 1, translateX: 0, translateY: 0, skewX: 0, skewY: 0, origin: 'center' },
  },
  {
    id: 'zoom',
    name: 'Zoom In (1.3倍 拡大)',
    description: 'ホバー時によく使われるなめらかな拡大エフェクト',
    previewColor: '#818cf8',
    state: { rotate: 0, scale: 1.3, translateX: 0, translateY: 0, skewX: 0, skewY: 0, origin: 'center' },
  },
  {
    id: 'hover-float',
    name: 'Hover Float (浮上 -8px)',
    description: 'Webボタンやカードのホバー時の定番「少し上に浮く」表現',
    previewColor: '#10b981',
    state: { rotate: 0, scale: 1.02, translateX: 0, translateY: -12, skewX: 0, skewY: 0, origin: 'center' },
  },
  {
    id: 'tilt',
    name: 'Tilt (斜め見下ろし / Skew)',
    description: '要素を平行四辺形に歪ませてダイナミックな躍動感を演出',
    previewColor: '#f59e0b',
    state: { rotate: -6, scale: 1, translateX: 0, translateY: 0, skewX: 12, skewY: 0, origin: 'center' },
  },
  {
    id: 'flip-x',
    name: 'Flip (左右反転)',
    description: 'scaleX(-1) で鏡のように左右を反転',
    previewColor: '#ec4899',
    state: { rotate: 0, scale: 1, scaleX: -1, scaleY: 1, isUniformScale: false, translateX: 0, translateY: 0, skewX: 0, skewY: 0, origin: 'center' },
  },
  {
    id: 'stamp',
    name: 'Stamp (スタンプ風)',
    description: '斜めの角度とスケールで「合格」「CONFIDENTIAL」スタンプを表現',
    previewColor: '#ef4444',
    state: { rotate: -25, scale: 1.15, translateX: 0, translateY: 0, skewX: 0, skewY: 0, origin: 'center' },
  },
];

const BREAKDOWN: BreakdownItem[] = [
  {
    key: 'translate',
    name: '移動 (translate)',
    role: '要素をX軸（横）またはY軸（縦）方向に移動。周囲のレイアウトを押し出さずに視覚的に動かします。',
    example: 'translate(20px, -10px)',
  },
  {
    key: 'rotate',
    name: '回転 (rotate)',
    role: '要素を中心（または指定した原点）を軸にして時計回りに回転させます。単位は deg（度）です。',
    example: 'rotate(45deg)',
  },
  {
    key: 'scale',
    name: '拡大縮小 (scale)',
    role: '要素の表示サイズを倍率で変更。1.0が通常等倍、1.2で120%拡大、0.8で80%縮小になります。',
    example: 'scale(1.2)',
  },
  {
    key: 'skew',
    name: '歪み・傾斜 (skew)',
    role: '要素を平行四辺形のように斜めに引っ張って歪ませます。スピード感や斜体バッジに最適。',
    example: 'skewX(10deg)',
  },
  {
    key: 'transform-origin',
    name: '変形の基準点 (origin)',
    role: '回転や拡大が「どの点を中心に行われるか」を定義。初期値は center (50% 50%) です。',
    example: 'transform-origin: top left;',
  },
];

const TIPS = [
  'なぜ margin ではなく transform: translateY(-4px); で動かすのか？ → transformはGPUで直接描画されるため、再レイアウト(Reflow)が発生せず60fpsで極めて滑らかに動きます。',
  'transformを複数組み合わせる場合、記述する順番によって結果が変わることがあります（例: 先に回転してから移動するか、移動してから回転するか）。',
  '左右反転・上下反転は scaleX(-1) や scaleY(-1) を使うと簡単に作れます。',
];

const ORIGIN_OPTIONS = [
  { label: '左上', value: 'top left' },
  { label: '上中央', value: 'top center' },
  { label: '右上', value: 'top right' },
  { label: '中央左', value: 'center left' },
  { label: '中央 (標準)', value: 'center' },
  { label: '中央右', value: 'center right' },
  { label: '左下', value: 'bottom left' },
  { label: '下中央', value: 'bottom center' },
  { label: '右下', value: 'bottom right' },
];

export const TransformLab: React.FC = () => {
  const [state, setState] = useState<TransformState>(INITIAL_STATE);
  const [highlightedProp, setHighlightedProp] = useState<string | undefined>();
  const [activePreset, setActivePreset] = useState<string>('rotate');
  const [layout, setLayout] = useState<'side' | 'top' | 'bottom'>('side');
  const [isSticky, setIsSticky] = useState<boolean>(true);

  // Build the transform string
  const transformParts: string[] = [];
  if (state.translateX !== 0) transformParts.push(`translateX(${state.translateX}px)`);
  if (state.translateY !== 0) transformParts.push(`translateY(${state.translateY}px)`);
  if (state.rotate !== 0) transformParts.push(`rotate(${state.rotate}deg)`);
  
  if (state.isUniformScale) {
    if (state.scale !== 1) transformParts.push(`scale(${state.scale})`);
  } else {
    if (state.scaleX !== 1) transformParts.push(`scaleX(${state.scaleX})`);
    if (state.scaleY !== 1) transformParts.push(`scaleY(${state.scaleY})`);
  }

  if (state.skewX !== 0) transformParts.push(`skewX(${state.skewX}deg)`);
  if (state.skewY !== 0) transformParts.push(`skewY(${state.skewY}deg)`);

  const transformValue = transformParts.length > 0 ? transformParts.join(' ') : 'none';

  let cssRules = `.demo {\n  transform: ${transformValue};`;
  if (state.origin !== 'center') {
    cssRules += `\n  transform-origin: ${state.origin};`;
  }
  cssRules += `\n}`;

  const inlineCss = `style="transform: ${transformValue};${state.origin !== 'center' ? ` transform-origin: ${state.origin};` : ''}"`;
  const tailwindTip = `${state.rotate !== 0 ? `rotate-[${state.rotate}deg] ` : ''}${state.scale !== 1 ? `scale-[${state.scale}] ` : ''}${state.translateX !== 0 ? `translate-x-[${state.translateX}px] ` : ''}${state.translateY !== 0 ? `-translate-y-[${Math.abs(state.translateY)}px] ` : ''}`.trim() || 'transform-none';

  const handleApplyPreset = (presetState: Partial<TransformState>) => {
    setState((prev) => ({ ...prev, ...presetState }));
  };

  const handleReset = () => {
    setState({
      ...INITIAL_STATE,
      rotate: 0,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      translateX: 0,
      translateY: 0,
      skewX: 0,
      skewY: 0,
      origin: 'center',
    });
    setActivePreset('none');
  };

  const renderControlPanel = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          変形コントロール
        </span>
        <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-900/60">
          2D Transformation
        </span>
      </div>

      {/* Transform Sliders */}
      <div className="space-y-3">
        {/* Rotate */}
        <SliderControl
          label="1. 回転 (rotate)"
          propertyKey="rotate"
          value={state.rotate}
          min={-180}
          max={180}
          step={1}
          unit="deg"
          onChange={(val) => setState((prev) => ({ ...prev, rotate: val }))}
          description="原点を中心に時計回り（正）または反時計回り（負）に回転します。"
          quickValues={[-90, -45, 0, 45, 90, 180]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'rotate'}
        />

        {/* Scale */}
        <SliderControl
          label="2. 拡大縮小 (scale)"
          propertyKey="scale"
          value={state.scale}
          min={0.2}
          max={2.0}
          step={0.05}
          unit="x"
          onChange={(val) => setState((prev) => ({ ...prev, scale: val, isUniformScale: true }))}
          description="要素のサイズ倍率。1.0が標準等倍、1.2で1.2倍、0.8で縮小です。"
          quickValues={[0.5, 0.8, 1.0, 1.2, 1.5, 2.0]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'scale'}
        />

        {/* Translate X & Y */}
        <div className="space-y-2.5">
          <SliderControl
            label="3. 移動 X (translateX)"
            propertyKey="translateX"
            value={state.translateX}
            min={-120}
            max={120}
            step={1}
            unit="px"
            onChange={(val) => setState((prev) => ({ ...prev, translateX: val }))}
            onHoverToken={setHighlightedProp}
            isHighlighted={highlightedProp === 'translateX'}
          />
          <SliderControl
            label="4. 移動 Y (translateY)"
            propertyKey="translateY"
            value={state.translateY}
            min={-120}
            max={120}
            step={1}
            unit="px"
            onChange={(val) => setState((prev) => ({ ...prev, translateY: val }))}
            onHoverToken={setHighlightedProp}
            isHighlighted={highlightedProp === 'translateY'}
          />
        </div>

        {/* Skew X & Y */}
        <div className="space-y-2.5">
          <SliderControl
            label="5. 歪み X (skewX)"
            propertyKey="skewX"
            value={state.skewX}
            min={-45}
            max={45}
            step={1}
            unit="deg"
            onChange={(val) => setState((prev) => ({ ...prev, skewX: val }))}
            onHoverToken={setHighlightedProp}
            isHighlighted={highlightedProp === 'skewX'}
          />
          <SliderControl
            label="6. 歪み Y (skewY)"
            propertyKey="skewY"
            value={state.skewY}
            min={-45}
            max={45}
            step={1}
            unit="deg"
            onChange={(val) => setState((prev) => ({ ...prev, skewY: val }))}
            onHoverToken={setHighlightedProp}
            isHighlighted={highlightedProp === 'skewY'}
          />
        </div>

        {/* Transform-origin selector */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            highlightedProp === 'transform-origin'
              ? 'bg-sky-950/40 border-sky-500/60 ring-1 ring-sky-500/30'
              : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
          }`}
          onMouseEnter={() => setHighlightedProp('transform-origin')}
          onMouseLeave={() => setHighlightedProp(undefined)}
        >
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-sky-400" />
              <span>変形の基準点 (transform-origin)</span>
            </label>
            <code className="text-[10px] font-mono text-sky-300">
              {state.origin}
            </code>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {ORIGIN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, origin: opt.value }))}
                className={`px-2 py-1.5 rounded text-[10px] font-medium transition cursor-pointer text-center ${
                  state.origin === opt.value
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm shadow-sky-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ghost outline toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-sky-400" />
            <span>元々の配置枠 (Ghost Outline) を表示</span>
          </span>
          <button
            type="button"
            onClick={() => setState((prev) => ({ ...prev, showGhostOutline: !prev.showGhostOutline }))}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
              state.showGhostOutline ? 'bg-sky-500' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                state.showGhostOutline ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreviewStage = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-[480px]">
      {/* Stage Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-200">
            リアルタイム 2D変形プレビュー
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Position switcher toolbar */}
          <PreviewPositionToolbar
            layout={layout}
            onChangeLayout={setLayout}
            isSticky={isSticky}
            onToggleSticky={setIsSticky}
            compact
          />
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            GPU Acceleration Active
          </span>
        </div>
      </div>

      {/* Visual Transformation Stage with Coordinate System */}
      <div className="relative flex-1 rounded-xl bg-slate-950 border border-slate-800/80 bg-lab-grid flex items-center justify-center p-6 sm:p-10 overflow-hidden min-h-[380px]">
        {/* Central axes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="w-full h-[1px] bg-slate-500"></div>
          <div className="h-full w-[1px] bg-slate-500 absolute"></div>
        </div>

        {/* Ghost Bounding Box (Original un-transformed position) */}
        {state.showGhostOutline && (
          <div className="absolute w-56 h-36 border-2 border-dashed border-sky-500/30 rounded-2xl flex flex-col items-center justify-center pointer-events-none p-3 select-none">
            <span className="text-[10px] font-mono text-sky-400/80 bg-slate-950/80 px-2 py-0.5 rounded border border-sky-900/50 mb-1">
              元々の配置位置 (0, 0)
            </span>
            <p className="text-[9px] text-slate-500 text-center leading-tight">
              周囲の要素を押し出さずに変形されます
            </p>
          </div>
        )}

        {/* Target Element transformed via CSS */}
        <div
          id="transform-preview-element"
          className="w-56 h-36 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-500 text-white p-4 shadow-2xl transition-all duration-150 flex flex-col justify-between select-none relative ring-2 ring-white/20"
          style={{
            transform: transformValue,
            transformOrigin: state.origin,
          }}
        >
          {/* Pivot point indicator positioned according to state.origin */}
          <div 
            className="absolute w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-lg z-20 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              top: state.origin.includes('top') ? '0%' : state.origin.includes('bottom') ? '100%' : '50%',
              left: state.origin.includes('left') ? '0%' : state.origin.includes('right') ? '100%' : '50%',
            }}
            title={`変形の基準点 (transform-origin: ${state.origin})`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
          </div>

          {/* Header inside card */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/30 backdrop-blur border border-white/20">
              Transform Object
            </span>
            <RotateCw className="w-3.5 h-3.5 text-white/80" />
          </div>

          <div className="space-y-0.5">
            <div className="text-xs font-black tracking-wide">
              CSS 2D 変形
            </div>
            <div className="text-[10px] opacity-90 font-mono">
              {state.rotate}° / {state.scale}x / X:{state.translateX} Y:{state.translateY}
            </div>
          </div>

          <div className="text-[9px] opacity-75 font-mono flex items-center justify-between">
            <span>origin: {state.origin}</span>
            <span className="text-rose-300 font-bold">🔴 基準点</span>
          </div>
        </div>
      </div>

      {/* Bottom summary bar */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
        <span className="font-mono text-sky-300 text-[11px]">
          transform: {transformValue};
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          基準点: {state.origin}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Lab Header & Presets */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Move className="w-5 h-5 text-sky-400" />
              <span>Transform 実験室</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              回転・拡大縮小・移動・傾斜・原点の変形メカニズムとGPU描画の仕組みを体験
            </p>
          </div>

          {/* Header Layout Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <PreviewPositionToolbar
              layout={layout}
              onChangeLayout={setLayout}
              isSticky={isSticky}
              onToggleSticky={setIsSticky}
              compact
            />
          </div>
        </div>

        {/* Preset quick bar */}
        <PresetButtons
          presets={PRESETS}
          onSelectPreset={handleApplyPreset}
          onReset={handleReset}
          currentPresetId={activePreset}
        />
      </div>

      {/* Main Layout (Top, Side, or Bottom) */}
      {layout === 'top' ? (
        <div className="space-y-6">
          {/* Top Preview Stage */}
          <div className="w-full">
            {renderPreviewStage()}
          </div>

          {/* Controls & Code below preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              {renderControlPanel()}
            </div>
            <div className="lg:col-span-5 space-y-4">
              <CodePanel
                cssRules={cssRules}
                inlineStyle={inlineCss}
                tailwindTip={tailwindTip}
                highlightedToken={highlightedProp}
                onHoverToken={setHighlightedProp}
              />
            </div>
          </div>
        </div>
      ) : layout === 'bottom' ? (
        <div className="space-y-6">
          {/* Controls & Code above preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              {renderControlPanel()}
            </div>
            <div className="lg:col-span-5 space-y-4">
              <CodePanel
                cssRules={cssRules}
                inlineStyle={inlineCss}
                tailwindTip={tailwindTip}
                highlightedToken={highlightedProp}
                onHoverToken={setHighlightedProp}
              />
            </div>
          </div>

          {/* Bottom Preview Stage */}
          <div className="w-full">
            {renderPreviewStage()}
          </div>
        </div>
      ) : (
        /* Side by Side (Default) with sticky support */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Sliders (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {renderControlPanel()}
            <CodePanel
              cssRules={cssRules}
              inlineStyle={inlineCss}
              tailwindTip={tailwindTip}
              highlightedToken={highlightedProp}
              onHoverToken={setHighlightedProp}
            />
          </div>

          {/* Right Column: Visual Stage (7 Cols) */}
          <div className={`lg:col-span-7 space-y-4 ${isSticky ? 'lg:sticky lg:top-4 z-10' : ''}`}>
            {renderPreviewStage()}
          </div>
        </div>
      )}

      {/* Beginner Explanation Card */}
      <PropertyExplanationCard
        title="Transform (2D変形・配置)"
        property="transform"
        summary="transform は、HTML要素の通常のレイアウトフロー（他の要素を押し出す処理）を変えずに、ブラウザのGPUを活用して高速に回転・拡大縮小・移動・歪みを与えるプロパティです。"
        breakdown={BREAKDOWN}
        tips={TIPS}
        onSelectPropertyKey={setHighlightedProp}
        activeKey={highlightedProp}
      />
    </div>
  );
};
