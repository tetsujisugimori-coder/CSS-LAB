import React, { useState } from 'react';
import { 
  Square, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Eye, 
  Compass, 
  Info,
  Maximize2
} from 'lucide-react';
import { BorderRadiusState, Preset } from '../../types';
import { SliderControl } from '../common/SliderControl';
import { CodePanel } from '../common/CodePanel';
import { PresetButtons } from '../common/PresetButtons';
import { PreviewPositionToolbar } from '../common/PreviewPositionToolbar';
import { PropertyExplanationCard, BreakdownItem } from '../common/PropertyExplanationCard';

const INITIAL_STATE: BorderRadiusState = {
  isUniform: true,
  uniform: 24,
  topLeft: 24,
  topRight: 24,
  bottomRight: 24,
  bottomLeft: 24,
  unit: 'px',
  showCornerGuides: true,
  previewBg: 'gradient',
};

const PRESETS: Preset<BorderRadiusState>[] = [
  {
    id: 'square',
    name: '0px (完全な四角)',
    description: '角丸なし。硬質でシャープなカードデザイン',
    previewColor: '#64748b',
    state: { isUniform: true, uniform: 0, topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
  },
  {
    id: 'modern-card',
    name: '12px (標準UIカード)',
    description: 'Web標準のすっきりしたモダンなUIカード',
    previewColor: '#38bdf8',
    state: { isUniform: true, uniform: 12, topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 },
  },
  {
    id: 'soft-card',
    name: '24px (柔らかい角丸)',
    description: '親しみやすく柔らかい印象を与えるUI',
    previewColor: '#818cf8',
    state: { isUniform: true, uniform: 24, topLeft: 24, topRight: 24, bottomRight: 24, bottomLeft: 24 },
  },
  {
    id: 'circle',
    name: '50% (正円・アバター)',
    description: '正方形の要素に50%を指定すると綺麗な円になります（長方形に使うと楕円になります）',
    previewColor: '#ec4899',
    state: { isUniform: true, uniform: 50, topLeft: 50, topRight: 50, bottomRight: 50, bottomLeft: 50, unit: '%' },
  },
  {
    id: 'pill',
    name: '9999px (ピル・カプセル型)',
    description: '長方形ボタンでも楕円にならず、両端が完全な半円になるプロの黄金テクニック',
    previewColor: '#10b981',
    state: { isUniform: true, uniform: 9999, topLeft: 9999, topRight: 9999, bottomRight: 9999, bottomLeft: 9999, unit: 'px' },
  },
  {
    id: 'leaf',
    name: 'Leaf (葉っぱ型)',
    description: '対角の角だけを丸めたアシンメトリーなオーガニック形状',
    previewColor: '#10b981',
    state: { isUniform: false, topLeft: 48, topRight: 0, bottomRight: 48, bottomLeft: 0, unit: 'px' },
  },
  {
    id: 'organic-blob',
    name: 'Organic (水滴・スライム)',
    description: '4つの角の値をすべて変えて自然な有機的シェイプを表現',
    previewColor: '#f59e0b',
    state: { isUniform: false, topLeft: 70, topRight: 30, bottomRight: 65, bottomLeft: 20, unit: 'px' },
  },
];

const BREAKDOWN: BreakdownItem[] = [
  {
    key: 'top-left',
    name: '左上 (Top-Left)',
    role: '左上の角の丸み半径。値が大きいほど丸くなります。',
    example: 'border-top-left-radius: 20px;',
  },
  {
    key: 'top-right',
    name: '右上 (Top-Right)',
    role: '右上の角の丸み半径。タブの右上などに活用。',
    example: 'border-top-right-radius: 20px;',
  },
  {
    key: 'bottom-right',
    name: '右下 (Bottom-Right)',
    role: '右下の角の丸み半径。チャット吹き出しの角尖りに活用。',
    example: 'border-bottom-right-radius: 0px;',
  },
  {
    key: 'bottom-left',
    name: '左下 (Bottom-Left)',
    role: '左下の角の丸み半径。アシンメトリーデザインで個性を付加。',
    example: 'border-bottom-left-radius: 20px;',
  },
  {
    key: 'pill-logic',
    name: 'ピル型 (9999px の原理)',
    role: 'CSS仕様では「角丸半径の合計が要素の短辺（高さ）を超える場合、ブラウザが自動的に短辺の50%まで等比縮小する」というルールがあります。そのため、幅がどれだけ長い長方形ボタンでも 9999px を指定すれば、歪んだ楕円にならず左右両端が完璧な半円（ピル形状）に保たれます。',
    example: 'border-radius: 9999px; /* Tailwind: rounded-full */',
  },
];

const TIPS = [
  '【50% と 9999px の決定的な違い】: 正方形（1:1）なら「50%」で美しい円になりますが、横長ボタンに「50%」を指定すると横幅の50%も丸めようとして「潰れた楕円」になってしまいます。横長ボタンを半円両端にするには「9999px」または「rounded-full」を指定するのがWeb標準のプロの技です。',
  '入れ子の要素（外側カードの中に内側バッジがある場合）の角丸は、「内側の角丸 ＝ 外側の角丸 - padding（余白）」に設定すると、角の隙間が均一で美しい幾何学的調和が生まれます。',
  'チャットの吹き出しUIを作る際は、片方の角（例えば右下）だけを 0px に設定することで、発言者のしっぽ（Pointer）をCSSだけで表現できます。',
];

export const BorderRadiusLab: React.FC = () => {
  const [state, setState] = useState<BorderRadiusState>(INITIAL_STATE);
  const [highlightedProp, setHighlightedProp] = useState<string | undefined>();
  const [activePreset, setActivePreset] = useState<string>('soft-card');
  const [previewShape, setPreviewShape] = useState<'card' | 'button' | 'avatar'>('card');
  const [layout, setLayout] = useState<'side' | 'top' | 'bottom'>('side');
  const [isSticky, setIsSticky] = useState<boolean>(true);

  // Compute CSS String
  const unit = state.unit;
  let borderRadiusCss = '';
  let inlineCss = '';
  let tailwindClass = '';

  if (state.isUniform) {
    const val = state.uniform >= 999 ? '9999px' : `${state.uniform}${unit}`;
    borderRadiusCss = `.demo {\n  border-radius: ${val};\n}`;
    inlineCss = `style="border-radius: ${val};"`;
    tailwindClass = state.uniform === 0 ? 'rounded-none' : state.uniform <= 8 ? 'rounded-md' : state.uniform <= 16 ? 'rounded-xl' : state.uniform <= 32 ? 'rounded-2xl' : state.uniform >= 999 ? 'rounded-full' : 'rounded-[...]';
  } else {
    const tl = `${state.topLeft}${unit}`;
    const tr = `${state.topRight}${unit}`;
    const br = `${state.bottomRight}${unit}`;
    const bl = `${state.bottomLeft}${unit}`;
    borderRadiusCss = `.demo {\n  /* 左上 右上 右下 左下 の時計回り順 */\n  border-radius: ${tl} ${tr} ${br} ${bl};\n}`;
    inlineCss = `style="border-radius: ${tl} ${tr} ${br} ${bl};"`;
    tailwindClass = `rounded-tl-[${tl}] rounded-tr-[${tr}] rounded-br-[${br}] rounded-bl-[${bl}]`;
  }

  // Get raw CSS style value for the preview element
  const getPreviewRadiusStyle = () => {
    if (state.isUniform) {
      return state.uniform >= 999 ? '9999px' : `${state.uniform}${unit}`;
    }
    return `${state.topLeft}${unit} ${state.topRight}${unit} ${state.bottomRight}${unit} ${state.bottomLeft}${unit}`;
  };

  const handleApplyPreset = (presetState: Partial<BorderRadiusState>) => {
    setState((prev) => ({ ...prev, ...presetState }));
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setActivePreset('soft-card');
  };

  const renderControlPanel = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          パラメータ操作
        </span>
        
        {/* Unit Selector */}
        <div className="flex items-center gap-1 bg-slate-950 px-1.5 py-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
          <span className="text-slate-500 text-[10px] mr-1">単位:</span>
          <button
            onClick={() => setState((prev) => ({ ...prev, unit: 'px' }))}
            className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
              state.unit === 'px' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            px
          </button>
          <button
            onClick={() => setState((prev) => ({ ...prev, unit: '%' }))}
            className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
              state.unit === '%' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            %
          </button>
        </div>
      </div>

      {/* Controls depending on isUniform */}
      {state.isUniform ? (
        <div className="space-y-4">
          <SliderControl
            label="全角共通 (border-radius)"
            propertyKey="border-radius"
            value={state.uniform >= 999 ? 9999 : state.uniform}
            min={0}
            max={state.unit === '%' ? 50 : 100}
            step={1}
            unit={state.unit}
            onChange={(val) =>
              setState((prev) => ({
                ...prev,
                uniform: val,
                topLeft: val,
                topRight: val,
                bottomRight: val,
                bottomLeft: val,
              }))
            }
            description={
              state.uniform >= 999 
                ? '現在「ピル・カプセル型 (9999px)」が適用されています。スライダーを動かすと通常の数値指定に戻ります。'
                : '四角形の4隅すべてに同じ角丸半径を適用します。0pxで四角形、50%で円になります。'
            }
            quickValues={state.unit === 'px' ? [0, 8, 16, 24, 32, 50, 100] : [0, 10, 25, 50]}
            onHoverToken={setHighlightedProp}
            isHighlighted={highlightedProp === 'border-radius'}
          />

          {/* Special 9999px Pill Button Quick Toggle with Detailed Explanation */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            state.uniform >= 999 
              ? 'bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30' 
              : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 block">
                    ピル・カプセル型 (9999px / rounded-full)
                  </span>
                  {state.uniform >= 999 && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                      適用中 (9999px)
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">
                  横幅がどれだけ伸びても歪まない完全な半円両端
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setState((prev) => {
                    const nextVal = prev.uniform >= 999 ? 24 : 9999;
                    return {
                      ...prev,
                      uniform: nextVal,
                      topLeft: nextVal,
                      topRight: nextVal,
                      bottomRight: nextVal,
                      bottomLeft: nextVal,
                      unit: 'px',
                    };
                  })
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer ${
                  state.uniform >= 999
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {state.uniform >= 999 ? 'ピル型を解除 (24px)' : '9999pxを適用'}
              </button>
            </div>

            {/* Visual difference note: 50% vs 9999px */}
            <div className="text-[11px] text-slate-400 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 space-y-1.5">
              <div className="text-sky-300 font-bold flex items-center gap-1 text-[11px]">
                <Info className="w-3.5 h-3.5 text-sky-400" />
                <span>なぜ 50% ではなく 9999px を使うのか？</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-300">
                横長のボタンに「50%」を指定すると横幅の半分も丸まろうとして<strong>「押しつぶされた楕円（ラグビーボール）」</strong>になります。
                一方「9999px」を指定すると、CSS仕様（角丸重複回避アルゴリズム）によりボタンの高さの半分で自動的に丸みが収まり、<strong>完璧な半円カプセル型</strong>になります。
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-[11px] text-sky-400 bg-sky-950/40 p-2 rounded-lg border border-sky-900/40 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>指定順序: 左上 → 右上 → 右下 → 左下（時計回り）</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <SliderControl
              label="1. 左上 (Top-Left)"
              propertyKey="top-left"
              value={state.topLeft}
              min={0}
              max={state.unit === '%' ? 50 : 100}
              unit={state.unit}
              onChange={(val) => setState((prev) => ({ ...prev, topLeft: val }))}
              onHoverToken={setHighlightedProp}
              isHighlighted={highlightedProp === 'top-left'}
            />
            <SliderControl
              label="2. 右上 (Top-Right)"
              propertyKey="top-right"
              value={state.topRight}
              min={0}
              max={state.unit === '%' ? 50 : 100}
              unit={state.unit}
              onChange={(val) => setState((prev) => ({ ...prev, topRight: val }))}
              onHoverToken={setHighlightedProp}
              isHighlighted={highlightedProp === 'top-right'}
            />
            <SliderControl
              label="4. 左下 (Bottom-Left)"
              propertyKey="bottom-left"
              value={state.bottomLeft}
              min={0}
              max={state.unit === '%' ? 50 : 100}
              unit={state.unit}
              onChange={(val) => setState((prev) => ({ ...prev, bottomLeft: val }))}
              onHoverToken={setHighlightedProp}
              isHighlighted={highlightedProp === 'bottom-left'}
            />
            <SliderControl
              label="3. 右下 (Bottom-Right)"
              propertyKey="bottom-right"
              value={state.bottomRight}
              min={0}
              max={state.unit === '%' ? 50 : 100}
              unit={state.unit}
              onChange={(val) => setState((prev) => ({ ...prev, bottomRight: val }))}
              onHoverToken={setHighlightedProp}
              isHighlighted={highlightedProp === 'bottom-right'}
            />
          </div>
        </div>
      )}

      {/* Corner guide overlay toggle */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>角丸の測定ガイド・補助線を表示</span>
        </span>
        <button
          type="button"
          onClick={() => setState((prev) => ({ ...prev, showCornerGuides: !prev.showCornerGuides }))}
          className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
            state.showCornerGuides ? 'bg-sky-500' : 'bg-slate-800'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
              state.showCornerGuides ? 'left-5' : 'left-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );

  const renderPreviewStage = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-[460px]">
      {/* Preview Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-200">
            リアルタイム プレビュー
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

          {/* Preview Shape Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setPreviewShape('card')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                previewShape === 'card' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              カード型
            </button>
            <button
              onClick={() => setPreviewShape('button')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                previewShape === 'button' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ボタン型
            </button>
            <button
              onClick={() => setPreviewShape('avatar')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                previewShape === 'avatar' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              正方形 (円テスト)
            </button>
          </div>
        </div>
      </div>

      {/* Visual Stage */}
      <div className="relative flex-1 rounded-xl bg-slate-950 border border-slate-800/80 bg-lab-grid flex items-center justify-center p-6 sm:p-10 overflow-hidden min-h-[300px]">
        {/* Ghost 0px outline for reference */}
        {state.showCornerGuides && (
          <div
            className={`absolute border border-dashed border-sky-500/30 transition-all pointer-events-none ${
              previewShape === 'button'
                ? 'w-64 h-16'
                : previewShape === 'avatar'
                ? 'w-48 h-48'
                : 'w-72 sm:w-80 h-52'
            }`}
          >
            <span className="absolute -top-4 left-0 text-[10px] font-mono text-sky-500/60">
              元々の四角形 (0px)
            </span>
          </div>
        )}

        {/* Target Element */}
        <div
          id="border-radius-preview-element"
          className={`relative shadow-2xl transition-all duration-150 flex flex-col items-center justify-center text-center p-4 select-none ${
            previewShape === 'button'
              ? 'w-64 h-16 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-sm ring-2 ring-white/20'
              : previewShape === 'avatar'
              ? 'w-48 h-48 bg-gradient-to-tr from-pink-500 via-purple-500 to-sky-500 text-white'
              : 'w-72 sm:w-80 h-52 bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border border-sky-500/30 text-white'
          }`}
          style={{
            borderRadius: getPreviewRadiusStyle(),
          }}
        >
          {previewShape === 'card' && (
            <div className="space-y-2 pointer-events-none">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center border border-sky-400/30">
                <Square className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-slate-100">
                CSS UI Card
              </div>
              <div className="text-[11px] font-mono text-sky-300 px-2 py-0.5 rounded bg-slate-950/70 inline-block border border-slate-700/50">
                radius: {getPreviewRadiusStyle()}
              </div>
            </div>
          )}

          {previewShape === 'button' && (
            <span className="tracking-wide">Action Button</span>
          )}

          {previewShape === 'avatar' && (
            <div className="space-y-1">
              <div className="text-2xl font-black">Avatar</div>
              <div className="text-[11px] font-mono opacity-80">50% で完全な円</div>
            </div>
          )}

          {/* Corner measurement badges if guide is on */}
          {state.showCornerGuides && (
            <>
              <span className="absolute top-1 left-2 text-[9px] font-mono text-sky-300 bg-slate-950/80 px-1 rounded border border-sky-800/60">
                TL: {state.isUniform ? state.uniform : state.topLeft}{unit}
              </span>
              <span className="absolute top-1 right-2 text-[9px] font-mono text-sky-300 bg-slate-950/80 px-1 rounded border border-sky-800/60">
                TR: {state.isUniform ? state.uniform : state.topRight}{unit}
              </span>
              <span className="absolute bottom-1 left-2 text-[9px] font-mono text-sky-300 bg-slate-950/80 px-1 rounded border border-sky-800/60">
                BL: {state.isUniform ? state.uniform : state.bottomLeft}{unit}
              </span>
              <span className="absolute bottom-1 right-2 text-[9px] font-mono text-sky-300 bg-slate-950/80 px-1 rounded border border-sky-800/60">
                BR: {state.isUniform ? state.uniform : state.bottomRight}{unit}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Bottom summary bar */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
        <span className="font-mono text-sky-300">
          現在の指定: border-radius: {getPreviewRadiusStyle()};
        </span>
        <span className="text-[11px] text-slate-500">
          {state.isUniform ? '全角共通モード' : '4隅個別モード'}
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
              <Square className="w-5 h-5 text-sky-400" />
              <span>Border Radius 実験室</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              四角形の4つの角を丸める仕組みと「px」「%」「9999px」の違いをマスターする
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

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setState((prev) => ({ ...prev, isUniform: true }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  state.isUniform
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                全角共通 (1つの値)
              </button>
              <button
                onClick={() => setState((prev) => ({ ...prev, isUniform: false }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  !state.isUniform
                    ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                4隅を個別指定 (時計回り)
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
                cssRules={borderRadiusCss}
                inlineStyle={inlineCss}
                tailwindTip={tailwindClass}
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
                cssRules={borderRadiusCss}
                inlineStyle={inlineCss}
                tailwindTip={tailwindClass}
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
          {/* Left Column: Sliders & Settings (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {renderControlPanel()}
            <CodePanel
              cssRules={borderRadiusCss}
              inlineStyle={inlineCss}
              tailwindTip={tailwindClass}
              highlightedToken={highlightedProp}
              onHoverToken={setHighlightedProp}
            />
          </div>

          {/* Right Column: Stage Preview & Interactive Object (7 Cols) */}
          <div className={`lg:col-span-7 space-y-4 ${isSticky ? 'lg:sticky lg:top-4 z-10' : ''}`}>
            {renderPreviewStage()}
          </div>
        </div>
      )}

      {/* Beginner Explanation Section */}
      <PropertyExplanationCard
        title="Border Radius (角丸)"
        property="border-radius"
        summary="border-radius は、要素の外枠の角に「半径rの円・楕円」を当てはめて丸めるプロパティです。数値を大きくするほど丸みが強くなり、正方形で50%を指定すると完全な円になります。"
        breakdown={BREAKDOWN}
        tips={TIPS}
        onSelectPropertyKey={setHighlightedProp}
        activeKey={highlightedProp}
      />
    </div>
  );
};
