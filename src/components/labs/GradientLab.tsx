import React, { useState } from 'react';
import { 
  Palette, 
  RotateCw, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  Eye, 
  Compass, 
  Sliders,
  Type,
  Maximize2,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { GradientState, GradientType, ColorStop, Preset } from '../../types';
import { SliderControl } from '../common/SliderControl';
import { CodePanel } from '../common/CodePanel';
import { PresetButtons } from '../common/PresetButtons';
import { PreviewPositionToolbar } from '../common/PreviewPositionToolbar';
import { PropertyExplanationCard, BreakdownItem } from '../common/PropertyExplanationCard';

const INITIAL_STOPS: ColorStop[] = [
  { id: '1', color: '#38bdf8', stop: 0 },
  { id: '2', color: '#818cf8', stop: 50 },
  { id: '3', color: '#c084fc', stop: 100 },
];

const INITIAL_STATE: GradientState = {
  type: 'linear',
  angle: 135,
  radialShape: 'circle',
  radialPosition: 'center',
  conicAngle: 0,
  conicPosition: 'at center',
  stops: INITIAL_STOPS,
  previewTarget: 'canvas',
};

const PRESETS: Preset<GradientState>[] = [
  {
    id: 'sunset',
    name: 'Sunset (夕暮れのサンセット)',
    description: 'オレンジからピンク・紫へ温かく移り変わる定番グラデーション',
    previewColor: '#ff7e5f',
    state: {
      type: 'linear',
      angle: 135,
      stops: [
        { id: 's1', color: '#ff7e5f', stop: 0 },
        { id: 's2', color: '#feb47b', stop: 60 },
        { id: 's3', color: '#eb3b5a', stop: 100 },
      ],
    },
  },
  {
    id: 'ocean',
    name: 'Ocean (深海ブルー)',
    description: 'サイバー感と落ち着きを両立したディープブルー',
    previewColor: '#00c6ff',
    state: {
      type: 'linear',
      angle: 160,
      stops: [
        { id: 'o1', color: '#00c6ff', stop: 0 },
        { id: 'o2', color: '#0072ff', stop: 100 },
      ],
    },
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber (ネオン)',
    description: 'ピンク・パープル・シアンのサイバーポップ',
    previewColor: '#f72585',
    state: {
      type: 'linear',
      angle: 90,
      stops: [
        { id: 'n1', color: '#f72585', stop: 0 },
        { id: 'n2', color: '#7209b7', stop: 50 },
        { id: 'n3', color: '#4cc9f0', stop: 100 },
      ],
    },
  },
  {
    id: 'radial-glow',
    name: 'Radial Glow (中心発光)',
    description: '中心から外側に向けて光が広がる放射状グラデーション',
    previewColor: '#38bdf8',
    state: {
      type: 'radial',
      radialShape: 'circle',
      radialPosition: 'center',
      stops: [
        { id: 'r1', color: '#38bdf8', stop: 0 },
        { id: 'r2', color: '#1e1b4b', stop: 70 },
        { id: 'r3', color: '#09090b', stop: 100 },
      ],
    },
  },
  {
    id: 'rainbow-conic',
    name: 'Rainbow Conic (カラーホイール)',
    description: '時計回りに色相環が美しく回転する円錐グラデーション',
    previewColor: '#ec4899',
    state: {
      type: 'conic',
      conicAngle: 0,
      conicPosition: 'at center',
      stops: [
        { id: 'c1', color: '#f43f5e', stop: 0 },
        { id: 'c2', color: '#fbbf24', stop: 25 },
        { id: 'c3', color: '#34d399', stop: 50 },
        { id: 'c4', color: '#38bdf8', stop: 75 },
        { id: 'c5', color: '#f43f5e', stop: 100 },
      ],
    },
  },
  {
    id: 'pastel-sky',
    name: 'Pastel Sky (パステルスカイ)',
    description: '淡く優しいトーンのモダンUI背景',
    previewColor: '#a1c4fd',
    state: {
      type: 'linear',
      angle: 120,
      stops: [
        { id: 'p1', color: '#a1c4fd', stop: 0 },
        { id: 'p2', color: '#c2e9fb', stop: 100 },
      ],
    },
  },
];

const BREAKDOWN: BreakdownItem[] = [
  {
    key: 'linear-gradient',
    name: '線形グラデーション (linear)',
    role: '直線（指定した角度方向）に沿って色が移り変わる最もポピュラーな指定。',
    example: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
  },
  {
    key: 'radial-gradient',
    name: '放射状グラデーション (radial)',
    role: '中心点から外側に向かって同心円・楕円状に波紋のように広がるグラデーション。',
    example: 'radial-gradient(circle at center, #fff, #000)',
  },
  {
    key: 'conic-gradient',
    name: '円錐グラデーション (conic)',
    role: '中心を軸に時計回りに扇状に色が回転。カラーピッカーや円グラフ、ローディングに活用。',
    example: 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #f00)',
  },
  {
    key: 'color-stop',
    name: 'カラーストップ位置 (stop %)',
    role: 'その色が100%の純度になる位置（0%〜100%）。位置を近づけるとくっきりした境界になります。',
    example: '#38bdf8 0%, #818cf8 100%',
  },
];

const TIPS = [
  '角度の目安: Webデザインで自然に見える斜めグラデーションは「135deg（左上から右下）」または「120deg」が黄金比率です。',
  'グラデーション文字を作るには: background: linear-gradient(...); -webkit-background-clip: text; -webkit-text-fill-color: transparent; を組み合わせます。',
  'カラーストップを同じ位置（例: #fff 50%, #000 50%）に設定すると、グラデーションではなくシャープな2色ツートーン背景を作成できます。',
];

export const GradientLab: React.FC = () => {
  const [state, setState] = useState<GradientState>(INITIAL_STATE);
  const [highlightedProp, setHighlightedProp] = useState<string | undefined>();
  const [activePreset, setActivePreset] = useState<string>('sunset');
  const [layout, setLayout] = useState<'side' | 'top' | 'bottom'>('side');
  const [isSticky, setIsSticky] = useState<boolean>(true);

  // Build the Gradient CSS string
  const sortedStops = [...state.stops].sort((a, b) => a.stop - b.stop);
  const stopsString = sortedStops
    .map((s) => `${s.color} ${s.stop}%`)
    .join(', ');

  let gradientValue = '';
  if (state.type === 'linear') {
    gradientValue = `linear-gradient(${state.angle}deg, ${stopsString})`;
  } else if (state.type === 'radial') {
    gradientValue = `radial-gradient(${state.radialShape} at ${state.radialPosition}, ${stopsString})`;
  } else if (state.type === 'conic') {
    gradientValue = `conic-gradient(from ${state.conicAngle}deg ${state.conicPosition}, ${stopsString})`;
  }

  const cssRules = `.demo {\n  background: ${gradientValue};\n}`;
  const inlineCss = `style="background: ${gradientValue};"`;
  const tailwindTip = state.type === 'linear' ? 'bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-500' : 'bg-[radial-gradient(...)]';

  // Add a new color stop
  const handleAddStop = () => {
    if (state.stops.length >= 6) return;
    const newId = Date.now().toString();
    const newStop: ColorStop = {
      id: newId,
      color: '#f43f5e',
      stop: Math.min(100, (state.stops[state.stops.length - 1]?.stop || 50) + 15),
    };
    setState((prev) => ({ ...prev, stops: [...prev.stops, newStop] }));
  };

  // Remove a color stop
  const handleRemoveStop = (id: string) => {
    if (state.stops.length <= 2) return; // Keep at least 2 stops
    setState((prev) => ({ ...prev, stops: prev.stops.filter((s) => s.id !== id) }));
  };

  // Update a single color stop
  const handleUpdateStop = (id: string, updates: Partial<ColorStop>) => {
    setState((prev) => ({
      ...prev,
      stops: prev.stops.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const handleApplyPreset = (presetState: Partial<GradientState>) => {
    setState((prev) => ({ ...prev, ...presetState }));
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setActivePreset('sunset');
  };

  const renderControlPanel = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {state.type.toUpperCase()} パラメータ設定
        </span>
        <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-900/60">
          {state.stops.length} 色ブレンド
        </span>
      </div>

      {/* Mode-Specific Controls */}
      {state.type === 'linear' && (
        <SliderControl
          label="グラデーション角度 (Angle)"
          propertyKey="angle"
          value={state.angle}
          min={0}
          max={360}
          step={5}
          unit="deg"
          onChange={(val) => setState((prev) => ({ ...prev, angle: val }))}
          description="0deg = 下から上、90deg = 左から右、135deg = 左上から右下の斜め（黄金比率）。"
          quickValues={[0, 45, 90, 135, 180, 270]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'angle'}
        />
      )}

      {state.type === 'radial' && (
        <div className="space-y-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-200">形状 & 中心位置</span>
            <code className="text-sky-300 font-mono text-[11px]">
              {state.radialShape} at {state.radialPosition}
            </code>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setState((prev) => ({ ...prev, radialShape: 'circle' }))}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                state.radialShape === 'circle' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Circle (正円)
            </button>
            <button
              onClick={() => setState((prev) => ({ ...prev, radialShape: 'ellipse' }))}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                state.radialShape === 'ellipse' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ellipse (楕円)
            </button>
          </div>
        </div>
      )}

      {state.type === 'conic' && (
        <SliderControl
          label="開始角度 (from angle)"
          propertyKey="conicAngle"
          value={state.conicAngle}
          min={0}
          max={360}
          step={5}
          unit="deg"
          onChange={(val) => setState((prev) => ({ ...prev, conicAngle: val }))}
          description="円錐グラデーションの開始角度（時計回り）。"
          quickValues={[0, 45, 90, 180, 270]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'conicAngle'}
        />
      )}

      {/* Color Stops Manager */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-sky-400" />
            <span>カラーストップ管理 (Color Stops)</span>
          </span>
          
          {state.stops.length < 6 && (
            <button
              onClick={handleAddStop}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-300 text-[11px] font-bold border border-sky-800/60 transition cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>色を追加</span>
            </button>
          )}
        </div>

        {/* Stop Sliders List */}
        <div className="space-y-2">
          {state.stops.map((st, idx) => (
            <div
              key={st.id}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 w-4 font-bold">
                  #{idx + 1}
                </span>
                <input
                  type="color"
                  value={st.color}
                  onChange={(e) => handleUpdateStop(st.id, { color: e.target.value })}
                  className="w-7 h-7 rounded bg-transparent cursor-pointer border border-slate-700"
                />
                <input
                  type="text"
                  value={st.color}
                  onChange={(e) => handleUpdateStop(st.id, { color: e.target.value })}
                  className="w-18 px-1.5 py-0.5 text-xs font-mono bg-slate-900 border border-slate-700 rounded text-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-[140px]">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={st.stop}
                  onChange={(e) => handleUpdateStop(st.id, { stop: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] font-mono text-sky-300 w-8 text-right">
                  {st.stop}%
                </span>
              </div>

              {state.stops.length > 2 && (
                <button
                  onClick={() => handleRemoveStop(st.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                  title="この色を削除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreviewStage = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-[480px]">
      {/* Stage Toolbar with Target Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-200">
            リアルタイム グラデーション プレビュー
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

          {/* Preview Target Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setState((prev) => ({ ...prev, previewTarget: 'canvas' }))}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                state.previewTarget === 'canvas' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              大画面キャンバス
            </button>
            <button
              onClick={() => setState((prev) => ({ ...prev, previewTarget: 'text' }))}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                state.previewTarget === 'text' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              グラデーション文字
            </button>
            <button
              onClick={() => setState((prev) => ({ ...prev, previewTarget: 'button' }))}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                state.previewTarget === 'button' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              モダンUIボタン
            </button>
          </div>
        </div>
      </div>

      {/* Visual Canvas Stage */}
      <div className="relative flex-1 rounded-xl bg-slate-950 border border-slate-800/80 bg-lab-grid flex items-center justify-center p-6 sm:p-8 overflow-hidden min-h-[340px]">
        {/* Target 1: Large Vibrant Canvas */}
        {state.previewTarget === 'canvas' && (
          <div
            id="gradient-preview-element"
            className="w-full h-64 sm:h-72 rounded-2xl shadow-2xl transition-all duration-150 flex flex-col items-center justify-center p-6 text-white text-center relative border border-white/20 select-none"
            style={{
              background: gradientValue,
            }}
          >
            <div className="bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20 shadow-2xl max-w-sm space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/40 uppercase">
                {state.type} gradient
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                CSS Gradient Visualizer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {state.stops.length} Colors Smooth Transition
              </p>
            </div>
          </div>
        )}

        {/* Target 2: Gradient Text with background-clip: text */}
        {state.previewTarget === 'text' && (
          <div className="text-center space-y-3 select-none">
            <h2
              className="text-4xl sm:text-6xl font-black tracking-tight"
              style={{
                backgroundImage: gradientValue,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CSS GRADIENT
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              background-clip: text; color: transparent;
            </p>
          </div>
        )}

        {/* Target 3: Action Button */}
        {state.previewTarget === 'button' && (
          <div className="space-y-4 text-center select-none max-w-md mx-auto">
            <button
              className="px-8 py-4 rounded-2xl text-white font-black text-base shadow-2xl transition hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-white/30"
              style={{
                background: gradientValue,
              }}
            >
              今すぐ無料で始める
            </button>
            
            {/* Detailed explanation for CTA & CTR with clear visual breakdown */}
            <div className="p-3.5 rounded-xl bg-slate-900/95 border border-slate-800 text-left space-y-2.5">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs border-b border-slate-800 pb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>CTAボタンにグラデーションを使う理由と高CTRの仕組み</span>
              </div>
              
              <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-300">
                <p>
                  <strong className="text-white">💡 CTA (Call To Action: 行動喚起)</strong> とは、ユーザーに「無料体験」「購入」「登録」などの主要アクションを起こしてもらうための最も重要なボタンです。
                </p>
                <p>
                  <strong className="text-white">📈 CTR (Click-Through Rate: クリック率)</strong> とは、ページを見た人のうち実際にボタンを押した人の割合（クリック数 ÷ 表示数）です。
                </p>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1 text-[10px] text-slate-400">
                <div className="text-sky-300 font-bold text-[11px] mb-1">なぜ単色ベタ塗りよりグラデーションが選ばれるのか？</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 leading-normal">
                  <li><strong>アフォーダンス（立体感）:</strong> 上部が明るく下部がわずかに濃いグラデーションは自然光の反射を再現し、「押せる立体ボタン」と直感的に認識されます。</li>
                  <li><strong>視線誘導:</strong> 周囲のフラットなデザインからボタンが浮き立ち、人間の視線を自然とボタン中央へ引きつけます。</li>
                  <li><strong>信頼感と成約率:</strong> 洗練されたモダンな配色により、A/BテストでCTR・成約率が15〜30%向上する事例が多数報告されています。</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom summary bar */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
        <span className="font-mono text-sky-300 text-[11px]">
          background: {gradientValue};
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          モード: {state.type}
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
              <Palette className="w-5 h-5 text-sky-400" />
              <span>Gradient 実験室</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              linear (線形)・radial (放射状)・conic (円錐) の3大グラデーションをマスターする
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Header Layout Switcher */}
            <PreviewPositionToolbar
              layout={layout}
              onChangeLayout={setLayout}
              isSticky={isSticky}
              onToggleSticky={setIsSticky}
              compact
            />

            {/* Type Selector Tab */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setState((prev) => ({ ...prev, type: 'linear' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  state.type === 'linear'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Linear (線形)
              </button>
              <button
                onClick={() => setState((prev) => ({ ...prev, type: 'radial' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  state.type === 'radial'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Radial (放射状)
              </button>
              <button
                onClick={() => setState((prev) => ({ ...prev, type: 'conic' }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  state.type === 'conic'
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Conic (円錐)
              </button>
            </div>
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
          {/* Left Column: Sliders & Color Stops (5 Cols) */}
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
        title="Gradient (グラデーション)"
        property="background: gradient"
        summary="CSSグラデーションは、画像ファイルを使わずにブラウザ上で2色以上のなめらかな色のグラデーションを直接レンダリングする強力なプロパティです。線形(linear)、放射状(radial)、円錐(conic)の3種類があります。"
        breakdown={BREAKDOWN}
        tips={TIPS}
        onSelectPropertyKey={setHighlightedProp}
        activeKey={highlightedProp}
      />
    </div>
  );
};
