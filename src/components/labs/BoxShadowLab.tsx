import React, { useState } from 'react';
import { 
  Box, 
  Sun, 
  Layers, 
  Sparkles, 
  Eye, 
  Check, 
  Sliders, 
  Compass, 
  Zap,
  Maximize2
} from 'lucide-react';
import { BoxShadowState, Preset } from '../../types';
import { SliderControl } from '../common/SliderControl';
import { CodePanel } from '../common/CodePanel';
import { PresetButtons } from '../common/PresetButtons';
import { PropertyExplanationCard, BreakdownItem } from '../common/PropertyExplanationCard';
import { PreviewPositionToolbar, PreviewLayout } from '../common/PreviewPositionToolbar';

const INITIAL_STATE: BoxShadowState = {
  offsetX: 0,
  offsetY: 12,
  blur: 24,
  spread: -4,
  color: '#000000',
  opacity: 35,
  inset: false,
  showLightRay: true,
  previewCardType: 'card',
  secondaryShadowEnabled: false,
};

const PRESETS: Preset<BoxShadowState>[] = [
  {
    id: 'soft',
    name: 'Soft (自然な浮遊感)',
    description: 'モダンWebデザインで最も愛用される自然な影',
    previewColor: '#38bdf8',
    state: { offsetX: 0, offsetY: 10, blur: 20, spread: -3, color: '#000000', opacity: 30, inset: false },
  },
  {
    id: 'floating',
    name: 'Floating (高いモーダル)',
    description: 'ダイアログやポップアップなど高いZ位置を表現',
    previewColor: '#818cf8',
    state: { offsetX: 0, offsetY: 25, blur: 45, spread: -5, color: '#000000', opacity: 40, inset: false },
  },
  {
    id: 'strong',
    name: 'Strong (レトロ・ポップ)',
    description: 'Neobrutalismやポップなカードに使うボールドな影',
    previewColor: '#f59e0b',
    state: { offsetX: 8, offsetY: 8, blur: 0, spread: 0, color: '#000000', opacity: 80, inset: false },
  },
  {
    id: 'inset',
    name: 'Inset (窪み・プレスボタン)',
    description: '内側に影を落として、押し込まれた立体感を表現',
    previewColor: '#ec4899',
    state: { offsetX: 0, offsetY: 6, blur: 10, spread: 0, color: '#000000', opacity: 50, inset: true },
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow (発光エフェクト)',
    description: 'ぼかしを大きくし、鮮やかな色で発光感を演出',
    previewColor: '#06b6d4',
    state: { offsetX: 0, offsetY: 0, blur: 30, spread: 4, color: '#38bdf8', opacity: 75, inset: false },
  },
  {
    id: 'layered',
    name: 'Layered (多重ナチュラル)',
    description: '複数の影を重ねて極上のリアリティを作るプロ技',
    previewColor: '#10b981',
    state: { offsetX: 0, offsetY: 14, blur: 28, spread: -4, color: '#000000', opacity: 35, inset: false, secondaryShadowEnabled: true },
  },
];

const BREAKDOWN: BreakdownItem[] = [
  {
    key: 'offset-x',
    name: '横方向 (offset-x)',
    role: '影を水平方向にずらす量。プラスで右、マイナスで左に影が出ます。',
    example: '10px （右に10px移動）',
  },
  {
    key: 'offset-y',
    name: '縦方向 (offset-y)',
    role: '影を垂直方向にずらす量。プラスで下、マイナスで上に影が出ます。',
    example: '12px （下に12px移動）',
  },
  {
    key: 'blur-radius',
    name: 'ぼかし (blur-radius)',
    role: '影の輪郭をぼかす半径。0pxでくっきり、数字が大きいほど柔らかく拡散します。',
    example: '24px （ふんわりした影）',
  },
  {
    key: 'spread-radius',
    name: '広がり (spread-radius)',
    role: '影そのものの面積を拡大/縮小。マイナスにすると影が要素より小さくなり自然になります。',
    example: '-4px （影を引き締める）',
  },
  {
    key: 'color',
    name: '色・透明度 (color / alpha)',
    role: '影の基本色と不透明度。真っ黒(#000)を薄いopacity(10〜30%)にするのが美しさの秘訣。',
    example: 'rgba(0, 0, 0, 0.25)',
  },
  {
    key: 'inset',
    name: '内側シャドウ (inset)',
    role: '指定すると外側ではなく「要素の内側」に影が落ち、窪んだ彫り込み表現になります。',
    example: 'inset (ON / OFF)',
  },
];

const TIPS = [
  '自然な影を作る極意: offset-xは「0」、offset-yは「8px〜16px」、blur-radiusはoffset-yの約2倍（16px〜32px）に設定すると、光が上から差している自然な印象になります。',
  'spread-radiusを「-4px」など少しマイナスに設定すると、影の端が要素からはみ出しすぎず、上品で引き締まった高級感が出ます。',
  '黒(#000000)の濃すぎる影は避け、rgba(0,0,0, 0.08) 〜 (0,0,0, 0.25) の薄いシャドウを基本にしましょう。',
];

export const BoxShadowLab: React.FC = () => {
  const [state, setState] = useState<BoxShadowState>(INITIAL_STATE);
  const [highlightedProp, setHighlightedProp] = useState<string | undefined>();
  const [activePreset, setActivePreset] = useState<string>('soft');
  const [stageBg, setStageBg] = useState<'dark' | 'light' | 'slate'>('dark');
  const [layout, setLayout] = useState<PreviewLayout>('side');
  const [isSticky, setIsSticky] = useState<boolean>(true);

  // Convert Hex to RGBA
  const hexToRgba = (hex: string, alphaPercent: number) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map((c) => c + c).join('');
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    const a = (alphaPercent / 100).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const shadowColorStr = hexToRgba(state.color, state.opacity);

  // Build the CSS string for box-shadow
  const primaryShadow = `${state.inset ? 'inset ' : ''}${state.offsetX}px ${state.offsetY}px ${state.blur}px ${state.spread}px ${shadowColorStr}`;
  const secondaryShadow = state.secondaryShadowEnabled
    ? `, ${state.inset ? 'inset ' : ''}0px 2px 4px 0px ${hexToRgba(state.color, Math.min(100, state.opacity * 0.6))}`
    : '';

  const fullShadowValue = `${primaryShadow}${secondaryShadow}`;

  const cssRules = `.demo {\n  /* X Y ぼかし 広がり 色 [inset] */\n  box-shadow: ${fullShadowValue};\n}`;
  const inlineCss = `style="box-shadow: ${fullShadowValue};"`;
  const tailwindTip = state.inset
    ? 'shadow-inner'
    : state.blur === 0
    ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]'
    : state.blur <= 15
    ? 'shadow-md'
    : state.blur <= 30
    ? 'shadow-lg'
    : 'shadow-2xl';

  const handleApplyPreset = (presetState: Partial<BoxShadowState>) => {
    setState((prev) => ({ ...prev, ...presetState }));
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setActivePreset('soft');
  };

  const renderControlPanel = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          シャドウの構成要素
        </span>
        <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-900/60">
          X Y Blur Spread Color
        </span>
      </div>

      {/* Sliders for each dimension */}
      <div className="space-y-3">
        <SliderControl
          label="1. 横方向 (offset-x)"
          propertyKey="offset-x"
          value={state.offsetX}
          min={-50}
          max={50}
          step={1}
          unit="px"
          onChange={(val) => setState((prev) => ({ ...prev, offsetX: val }))}
          description="水平方向のズレ。プラスで右、マイナスで左へ影が伸びます。"
          quickValues={[-20, -10, 0, 10, 20]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'offset-x'}
        />

        <SliderControl
          label="2. 縦方向 (offset-y)"
          propertyKey="offset-y"
          value={state.offsetY}
          min={-50}
          max={50}
          step={1}
          unit="px"
          onChange={(val) => setState((prev) => ({ ...prev, offsetY: val }))}
          description="垂直方向のズレ。プラスで下、マイナスで上へ影が落ちます。"
          quickValues={[-10, 0, 8, 16, 24, 32]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'offset-y'}
        />

        <SliderControl
          label="3. ぼかし半径 (blur-radius)"
          propertyKey="blur-radius"
          value={state.blur}
          min={0}
          max={80}
          step={1}
          unit="px"
          onChange={(val) => setState((prev) => ({ ...prev, blur: val }))}
          description="大きくすると影の輪郭が柔らかくぼやけます。0pxでくっきりしたハードシャドウ。"
          quickValues={[0, 8, 16, 24, 40, 60]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'blur-radius'}
        />

        <SliderControl
          label="4. 影の広がり (spread-radius)"
          propertyKey="spread-radius"
          value={state.spread}
          min={-30}
          max={50}
          step={1}
          unit="px"
          onChange={(val) => setState((prev) => ({ ...prev, spread: val }))}
          description="影自体の面積を拡大または引き締めます。マイナスにすると影が要素の内側に収まります。"
          quickValues={[-10, -4, 0, 4, 10, 20]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'spread-radius'}
        />

        {/* Color & Opacity Controls */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            highlightedProp === 'color'
              ? 'bg-sky-950/40 border-sky-500/60 ring-1 ring-sky-500/30'
              : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
          }`}
          onMouseEnter={() => setHighlightedProp('color')}
          onMouseLeave={() => setHighlightedProp(undefined)}
        >
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-200">
              5. 影の色と透明度 (Color & Opacity)
            </label>
            <code className="text-[11px] font-mono text-sky-300">
              {shadowColorStr}
            </code>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={state.color}
                onChange={(e) => setState((prev) => ({ ...prev, color: e.target.value }))}
                className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-slate-700"
              />
              <input
                type="text"
                value={state.color}
                onChange={(e) => setState((prev) => ({ ...prev, color: e.target.value }))}
                className="w-20 px-2 py-1 text-xs font-mono bg-slate-950 border border-slate-700 rounded text-slate-200"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>不透明度</span>
                <span>{state.opacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={state.opacity}
                onChange={(e) => setState((prev) => ({ ...prev, opacity: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Multi-layer elevation toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>2重レイヤー影 (さらに自然なElevation)</span>
          </span>
          <button
            type="button"
            onClick={() => setState((prev) => ({ ...prev, secondaryShadowEnabled: !prev.secondaryShadowEnabled }))}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
              state.secondaryShadowEnabled ? 'bg-sky-500' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                state.secondaryShadowEnabled ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreviewStage = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-[460px]">
      {/* Stage Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-200">
            リアルタイム 影プレビュー
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

          {/* Background Theme Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-500 px-1">背景:</span>
            <button
              onClick={() => setStageBg('dark')}
              className={`px-2 py-0.5 rounded font-semibold transition cursor-pointer ${
                stageBg === 'dark' ? 'bg-slate-800 text-sky-400 font-bold border border-sky-500/30' : 'text-slate-400'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setStageBg('slate')}
              className={`px-2 py-0.5 rounded font-semibold transition cursor-pointer ${
                stageBg === 'slate' ? 'bg-slate-800 text-sky-400 font-bold border border-sky-500/30' : 'text-slate-400'
              }`}
            >
              Slate
            </button>
            <button
              onClick={() => setStageBg('light')}
              className={`px-2 py-0.5 rounded font-semibold transition cursor-pointer ${
                stageBg === 'light' ? 'bg-slate-200 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Light
            </button>
          </div>
        </div>
      </div>

      {/* Dark Mode Shadow Hint Caption */}
      <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <span className="font-bold block text-amber-200">💡 ダーク背景での影の注意点とプロのTips</span>
          背景が黒いダークモードでは、黒い影（#000000）が背景と同化して見えにくくなります。
          影の広がりやボケ感をくっきり確認したい場合は、右上の<span className="font-bold text-white bg-slate-800 px-1 py-0.5 rounded mx-0.5">「Light (白)」</span>背景に切り替えるか、プリセットの<span className="font-bold text-sky-300 bg-sky-950 px-1 py-0.5 rounded mx-0.5">「Neon Glow (発光)」</span>をお試しください。
        </div>
      </div>

      {/* Visual Stage */}
      <div
        className={`relative flex-1 rounded-xl border flex items-center justify-center p-8 sm:p-14 overflow-hidden min-h-[320px] transition-colors ${
          stageBg === 'light'
            ? 'bg-slate-100 border-slate-300 bg-lab-grid-light'
            : stageBg === 'slate'
            ? 'bg-slate-800 border-slate-700 bg-lab-grid'
            : 'bg-slate-950 border-slate-800/80 bg-lab-grid'
        }`}
      >
        {/* Virtual Light Source Ray (Top Left) */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs text-amber-400/80 pointer-events-none select-none">
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="text-[10px] font-mono">仮想光源 (Light Source)</span>
        </div>

        {/* Target Element with Box Shadow */}
        <div
          id="box-shadow-preview-element"
          className={`relative w-72 sm:w-80 p-6 rounded-2xl transition-all duration-150 flex flex-col justify-between select-none ${
            stageBg === 'light'
              ? 'bg-white text-slate-800 border border-slate-200/80'
              : 'bg-slate-800 text-white border border-slate-700/80'
          }`}
          style={{
            boxShadow: fullShadowValue,
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                {state.inset ? 'Inset Mode' : 'Elevated Card'}
              </span>
              <span className="text-xs font-mono opacity-60">
                Z-Index Depth
              </span>
            </div>

            <h4 className="text-base font-bold tracking-tight">
              インタラクティブ カード
            </h4>
            <p className="text-xs opacity-75 leading-relaxed">
              スライダーを動かすと、影の距離やボケ感がリアルタイムに反映されます。
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs">
            <span className="font-mono text-sky-400 text-[11px]">
              {state.blur}px blur
            </span>
            <span className="text-[11px] opacity-60 font-mono">
              spread: {state.spread}px
            </span>
          </div>
        </div>
      </div>

      {/* Bottom summary decomposition bar */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
        <div className="flex items-center gap-3 font-mono text-[11px] flex-wrap">
          <span className={highlightedProp === 'offset-x' ? 'text-sky-400 font-bold' : 'text-slate-400'}>
            X: {state.offsetX}px
          </span>
          <span className={highlightedProp === 'offset-y' ? 'text-sky-400 font-bold' : 'text-slate-400'}>
            Y: {state.offsetY}px
          </span>
          <span className={highlightedProp === 'blur-radius' ? 'text-sky-400 font-bold' : 'text-slate-400'}>
            Blur: {state.blur}px
          </span>
          <span className={highlightedProp === 'spread-radius' ? 'text-sky-400 font-bold' : 'text-slate-400'}>
            Spread: {state.spread}px
          </span>
          <span className={highlightedProp === 'color' ? 'text-sky-400 font-bold' : 'text-slate-400'}>
            {state.opacity}%
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          {state.inset ? '内側(inset)' : '外側(drop)'}
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
              <Box className="w-5 h-5 text-sky-400" />
              <span>Box Shadow 実験室</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              X/Y座標・ぼかし・広がり・色・insetを分解して影の立体感をマスターする
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
            {/* Preview Position Toolbar */}
            <PreviewPositionToolbar
              layout={layout}
              onChangeLayout={setLayout}
              isSticky={isSticky}
              onToggleSticky={setIsSticky}
              compact
            />

            {/* Inset Toggle button */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setState((prev) => ({ ...prev, inset: false }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  !state.inset
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                外側(通常)
              </button>
              <button
                onClick={() => setState((prev) => ({ ...prev, inset: true }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  state.inset
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                内側(inset)
              </button>
            </div>
          </div>
        </div>

        {/* Preset Buttons */}
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

          {/* Right Column: Stage & Shadow Visualization (7 Cols) */}
          <div className={`lg:col-span-7 space-y-4 ${isSticky ? 'lg:sticky lg:top-4 z-10' : ''}`}>
            {renderPreviewStage()}
          </div>
        </div>
      )}

      {/* Beginner Explanation Card */}
      <PropertyExplanationCard
        title="Box Shadow (影・立体感)"
        property="box-shadow"
        summary="box-shadow は、要素の背後または内側に影を投影して立体感（Elevation）を作るプロパティです。X座標・Y座標・ぼかし・広がりの4つの数値と色で構成されます。"
        breakdown={BREAKDOWN}
        tips={TIPS}
        onSelectPropertyKey={setHighlightedProp}
        activeKey={highlightedProp}
      />
    </div>
  );
};
