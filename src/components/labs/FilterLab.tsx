import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Sliders, 
  Layers, 
  HelpCircle, 
  Palette, 
  Eye,
  Maximize2
} from 'lucide-react';
import { FilterState, Preset } from '../../types';
import { SliderControl } from '../common/SliderControl';
import { CodePanel } from '../common/CodePanel';
import { PresetButtons } from '../common/PresetButtons';
import { PreviewPositionToolbar } from '../common/PreviewPositionToolbar';
import { PropertyExplanationCard, BreakdownItem } from '../common/PropertyExplanationCard';

const INITIAL_STATE: FilterState = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  saturate: 100,
  sepia: 0,
  hueRotate: 0,
  opacity: 100,
  invert: 0,
  previewSubject: 'illustration',
};

const PRESETS: Preset<FilterState>[] = [
  {
    id: 'natural',
    name: 'Natural (標準)',
    description: 'フィルタなしの元の状態',
    previewColor: '#64748b',
    state: { blur: 0, brightness: 100, contrast: 100, grayscale: 0, saturate: 100, sepia: 0, hueRotate: 0, opacity: 100, invert: 0 },
  },
  {
    id: 'vintage',
    name: 'Vintage (レトロ写真)',
    description: 'セピアとコントラストで古写真のような風合い',
    previewColor: '#d97706',
    state: { blur: 0, brightness: 105, contrast: 120, grayscale: 15, saturate: 85, sepia: 65, hueRotate: -15, opacity: 100, invert: 0 },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk (ネオン)',
    description: '色相回転と超高彩度でサイバーパンクな発色',
    previewColor: '#06b6d4',
    state: { blur: 0, brightness: 115, contrast: 140, grayscale: 0, saturate: 240, sepia: 0, hueRotate: 180, opacity: 100, invert: 0 },
  },
  {
    id: 'monolith-bw',
    name: 'Monolith (ハイコントラスト白黒)',
    description: '完全なモノクロに明暗差を強めたアート調',
    previewColor: '#000000',
    state: { blur: 0, brightness: 110, contrast: 150, grayscale: 100, saturate: 0, sepia: 0, hueRotate: 0, opacity: 100, invert: 0 },
  },
  {
    id: 'dreamy-soft',
    name: 'Dreamy (幻想的なソフト感)',
    description: 'わずかなブラーと高輝度で夢のような柔らかさ',
    previewColor: '#a855f7',
    state: { blur: 3, brightness: 125, contrast: 90, grayscale: 0, saturate: 130, sepia: 10, hueRotate: 20, opacity: 100, invert: 0 },
  },
  {
    id: 'night-vision',
    name: 'Night Vision (反転・ネガ)',
    description: 'ネガポジ反転と色相回転で近未来スコープ風',
    previewColor: '#10b981',
    state: { blur: 0, brightness: 100, contrast: 120, grayscale: 0, saturate: 180, sepia: 0, hueRotate: 90, opacity: 100, invert: 100 },
  },
];

const BREAKDOWN: BreakdownItem[] = [
  {
    key: 'blur',
    name: 'ぼかし (blur)',
    role: '画像をピクセル単位でぼかします。モーダル表示時の背景すりガラスやプライバシー保護に活用。',
    example: 'blur(4px)',
  },
  {
    key: 'brightness',
    name: '明るさ (brightness)',
    role: '画像全体の輝度を調整。100%が標準、0%で真っ黒、200%で2倍明るくなります。',
    example: 'brightness(120%)',
  },
  {
    key: 'contrast',
    name: '明暗差 (contrast)',
    role: '明るい部分と暗い部分の差を強調。100%が標準、数値を上げるとメリハリがつきます。',
    example: 'contrast(130%)',
  },
  {
    key: 'grayscale',
    name: '白黒化 (grayscale)',
    role: 'カラー画像をモノクロ（グレースケール）に変換。未達成バッジや無効化アイコンに頻出。',
    example: 'grayscale(100%)',
  },
  {
    key: 'saturate',
    name: '彩度 (saturate)',
    role: '色の鮮やかさを増減。0%で白黒、200%で超鮮やかなビビッドカラーになります。',
    example: 'saturate(180%)',
  },
  {
    key: 'hue-rotate',
    name: '色相回転 (hue-rotate)',
    role: '色相環に沿って色味を回転。青いアイコンを緑や紫にCSSだけでカラーチェンジできます。',
    example: 'hue-rotate(90deg)',
  },
  {
    key: 'sepia',
    name: 'セピア調 (sepia)',
    role: '写真をノスタルジックな茶褐色に加工。',
    example: 'sepia(60%)',
  },
  {
    key: 'invert',
    name: '反転 (invert)',
    role: '白と黒や色相を完全にネガポジ反転。ダークモード時の黒アイコン反転に重宝。',
    example: 'invert(100%)',
  },
];

const TIPS = [
  'すりガラス（グラスモーフィズム）UIを作る際は、filter ではなく backdrop-filter: blur(12px); を使用すると、要素自体の文字をぼかさず背景だけをぼかせます。',
  '白黒のアイコンをダークモードで白く反転させたい時は、filter: invert(100%); を指定するのが手軽で強力です。',
  'filterは複数スペース区切りで連結でき、左から順番にエフェクトが適用されます。',
];

export const FilterLab: React.FC = () => {
  const [state, setState] = useState<FilterState>(INITIAL_STATE);
  const [highlightedProp, setHighlightedProp] = useState<string | undefined>();
  const [activePreset, setActivePreset] = useState<string>('natural');
  const [stageBg, setStageBg] = useState<'dark' | 'slate' | 'light'>('dark');
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [layout, setLayout] = useState<'side' | 'top' | 'bottom'>('side');
  const [isSticky, setIsSticky] = useState<boolean>(true);

  // Build the CSS Filter String
  const filterParts: string[] = [];
  if (state.blur > 0) filterParts.push(`blur(${state.blur}px)`);
  if (state.brightness !== 100) filterParts.push(`brightness(${state.brightness}%)`);
  if (state.contrast !== 100) filterParts.push(`contrast(${state.contrast}%)`);
  if (state.grayscale > 0) filterParts.push(`grayscale(${state.grayscale}%)`);
  if (state.saturate !== 100) filterParts.push(`saturate(${state.saturate}%)`);
  if (state.sepia > 0) filterParts.push(`sepia(${state.sepia}%)`);
  if (state.hueRotate !== 0) filterParts.push(`hue-rotate(${state.hueRotate}deg)`);
  if (state.opacity !== 100) filterParts.push(`opacity(${state.opacity}%)`);
  if (state.invert > 0) filterParts.push(`invert(${state.invert}%)`);

  const filterValue = filterParts.length > 0 ? filterParts.join(' ') : 'none';
  const appliedFilter = showOriginal ? 'none' : filterValue;
  const cssRules = `.demo {\n  filter: ${filterValue};\n}`;
  const inlineCss = `style="filter: ${filterValue};"`;
  const tailwindTip = state.grayscale === 100 ? 'grayscale' : state.blur > 0 ? `blur-[${state.blur}px]` : state.brightness !== 100 ? `brightness-${state.brightness}` : 'filter-none';

  const handleApplyPreset = (presetState: Partial<FilterState>) => {
    setState((prev) => ({ ...prev, ...presetState }));
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setActivePreset('natural');
  };

  const renderControlPanel = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          フィルタ調整パネル
        </span>
        <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-900/60">
          Visual Effects
        </span>
      </div>

      {/* Filter Sliders */}
      <div className="space-y-3">
        <SliderControl
          label="1. ぼかし (blur)"
          propertyKey="blur"
          value={state.blur}
          min={0}
          max={20}
          step={1}
          unit="px"
          onChange={(val) => setState((prev) => ({ ...prev, blur: val }))}
          description="ピクセルを平均化して画像をぼかします。0pxで通常、数値が大きいほどぼやけます。"
          quickValues={[0, 2, 4, 8, 12, 16]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'blur'}
        />

        <SliderControl
          label="2. 明るさ (brightness)"
          propertyKey="brightness"
          value={state.brightness}
          min={0}
          max={200}
          step={5}
          unit="%"
          onChange={(val) => setState((prev) => ({ ...prev, brightness: val }))}
          description="明度の調整。100%が標準、0%で真っ黒、200%で2倍の明るさになります。"
          quickValues={[0, 50, 100, 150, 200]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'brightness'}
        />

        <SliderControl
          label="3. 明暗差 (contrast)"
          propertyKey="contrast"
          value={state.contrast}
          min={0}
          max={200}
          step={5}
          unit="%"
          onChange={(val) => setState((prev) => ({ ...prev, contrast: val }))}
          description="コントラスト（明暗の差）。100%が標準、0%で均一な灰色、200%でくっきり強調。"
          quickValues={[0, 50, 100, 150, 200]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'contrast'}
        />

        <SliderControl
          label="4. 白黒化 (grayscale)"
          propertyKey="grayscale"
          value={state.grayscale}
          min={0}
          max={100}
          step={5}
          unit="%"
          onChange={(val) => setState((prev) => ({ ...prev, grayscale: val }))}
          description="モノクロ（白黒）化。0%で元のフルカラー、100%で完全なグレースケールになります。"
          quickValues={[0, 25, 50, 75, 100]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'grayscale'}
        />

        <SliderControl
          label="5. 彩度 (saturate)"
          propertyKey="saturate"
          value={state.saturate}
          min={0}
          max={300}
          step={10}
          unit="%"
          onChange={(val) => setState((prev) => ({ ...prev, saturate: val }))}
          description="色の鮮やかさ。0%で色抜け、100%が通常、200%以上でビビッドな超鮮やかカラー。"
          quickValues={[0, 50, 100, 150, 200, 300]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'saturate'}
        />

        <SliderControl
          label="6. 色相回転 (hue-rotate)"
          propertyKey="hue-rotate"
          value={state.hueRotate}
          min={0}
          max={360}
          step={5}
          unit="deg"
          onChange={(val) => setState((prev) => ({ ...prev, hueRotate: val }))}
          description="色相環を回転させて色味をガラリと変えます（赤→緑→青→赤と360度で一周）。"
          quickValues={[0, 45, 90, 180, 270, 360]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'hue-rotate'}
        />

        <SliderControl
          label="7. セピア (sepia)"
          propertyKey="sepia"
          value={state.sepia}
          min={0}
          max={100}
          step={5}
          unit="%"
          onChange={(val) => setState((prev) => ({ ...prev, sepia: val }))}
          description="レトロな茶褐色・セピア調に変換。0%で通常、100%で完全なアンティーク調。"
          quickValues={[0, 25, 50, 75, 100]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'sepia'}
        />

        <SliderControl
          label="8. 色の反転 (invert)"
          propertyKey="invert"
          value={state.invert}
          min={0}
          max={100}
          step={5}
          unit="%"
          onChange={(val) => setState((prev) => ({ ...prev, invert: val }))}
          description="色をネガポジ反転（白↔黒、赤↔シアン）。100%でダーク/ライトモードの反転に似た効果。"
          quickValues={[0, 25, 50, 75, 100]}
          onHoverToken={setHighlightedProp}
          isHighlighted={highlightedProp === 'invert'}
        />
      </div>
    </div>
  );

  const renderPreviewStage = () => (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-[480px]">
      {/* Stage Toolbar with Subject Picker & Background Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-200">
            リアルタイム フィルタ画像プレビュー
          </span>
          {showOriginal && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
              オリジナル表示中
            </span>
          )}
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

          {/* Compare Button */}
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
              showOriginal
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
            title="クリックして元画像と比較"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showOriginal ? 'エフェクト適用' : '元画像と比較'}</span>
          </button>

          {/* Stage Background Switcher */}
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

      {/* Subject Switcher Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="text-[11px] text-slate-400">プレビュー対象を選択:</span>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setState((prev) => ({ ...prev, previewSubject: 'illustration' }))}
            className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
              state.previewSubject === 'illustration' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            幾何学アート
          </button>
          <button
            onClick={() => setState((prev) => ({ ...prev, previewSubject: 'landscape' }))}
            className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
              state.previewSubject === 'landscape' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            風景・サンセット
          </button>
          <button
            onClick={() => setState((prev) => ({ ...prev, previewSubject: 'ui-card' }))}
            className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
              state.previewSubject === 'ui-card' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            UIカード
          </button>
        </div>
      </div>

      {/* Filter Invert / Sepia Tips & Visual Guidance */}
      {(state.invert > 0 || state.sepia > 0) && (
        <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs flex items-start gap-2">
          <Sparkles className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-bold block text-indigo-300">
              💡 {state.invert > 0 ? `反転 (invert: ${state.invert}%)` : ''} {state.sepia > 0 ? `セピア (sepia: ${state.sepia}%)` : ''} 適用時の見え方
            </span>
            {state.invert > 0 && '「反転」は黒が白に、白が黒に反転するため、暗い背景に置くとカード全体が発光したように白く明るくなります。背景を「Light」に切り替えるとより自然なネガポジ効果が確認できます。'}
            {state.sepia > 0 && '「セピア」はカラー写真を古紙のような温かい茶褐色に変換します。'}
          </div>
        </div>
      )}

      {/* Visual Stage where Filter is applied */}
      <div 
        className={`relative flex-1 rounded-xl border border-slate-800/80 flex items-center justify-center p-6 sm:p-10 overflow-hidden min-h-[340px] transition-colors duration-200 ${
          stageBg === 'dark' ? 'bg-slate-950 bg-lab-grid' : stageBg === 'slate' ? 'bg-slate-800' : 'bg-slate-100'
        }`}
      >
        {/* Target Artwork with Filter Applied */}
        <div
          id="filter-preview-element"
          className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 transition-all duration-150 relative select-none"
          style={{
            filter: appliedFilter,
          }}
        >
          {/* 1. Geometric Colorful Illustration */}
          {state.previewSubject === 'illustration' && (
            <div className="bg-slate-900 p-6 space-y-4">
              <div className="h-44 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 relative overflow-hidden flex items-center justify-center p-4">
                {/* Geometric SVG overlay */}
                <div className="w-24 h-24 rounded-full bg-amber-400/90 shadow-xl ring-8 ring-white/30 backdrop-blur"></div>
                <div className="w-16 h-16 rounded-xl bg-cyan-400/80 absolute top-4 left-6 rotate-12 shadow-lg"></div>
                <div className="w-20 h-20 rounded-2xl bg-rose-500/80 absolute bottom-3 right-6 -rotate-12 shadow-lg"></div>
                
                <div className="absolute bottom-2 left-4 text-white text-xs font-black tracking-wider drop-shadow-md">
                  CSS FILTER ARTWORK
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="font-bold">Colorful Palette Object</span>
                </div>
                <span className="font-mono text-[11px] text-sky-400">
                  {state.hueRotate}° Hue / {state.saturate}% Sat
                </span>
              </div>
            </div>
          )}

          {/* 2. Landscape sunset vector */}
          {state.previewSubject === 'landscape' && (
            <div className="bg-slate-900 p-6 space-y-3">
              <div className="h-44 rounded-xl bg-gradient-to-b from-indigo-900 via-purple-800 to-amber-500 relative overflow-hidden flex flex-col justify-end p-4">
                {/* Glowing Sun */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-t from-amber-300 to-yellow-100 absolute top-6 right-10 shadow-2xl ring-4 ring-amber-400/40"></div>
                
                {/* Mountains */}
                <div className="flex items-end justify-between absolute bottom-0 inset-x-0 h-20 opacity-90">
                  <div className="w-1/2 h-16 bg-slate-950 rounded-tr-3xl -ml-2"></div>
                  <div className="w-2/3 h-20 bg-slate-900 rounded-tl-3xl"></div>
                  <div className="w-1/3 h-12 bg-slate-950 rounded-tl-2xl"></div>
                </div>

                <div className="relative z-10 text-white font-bold text-xs tracking-wider">
                  Sunset Landscape Horizon
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                明暗差やセピア・白黒化が最もわかりやすい風景グラフィック
              </p>
            </div>
          )}

          {/* 3. UI Dashboard Card */}
          {state.previewSubject === 'ui-card' && (
            <div className="bg-slate-900 p-5 space-y-3 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-xs">
                    UI
                  </div>
                  <div>
                    <div className="text-xs font-bold">Analytics Panel</div>
                    <div className="text-[10px] text-slate-400">Active Metric</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  +28.4%
                </span>
              </div>

              <div className="h-16 rounded-lg bg-slate-950 p-2.5 flex items-end justify-between gap-1.5 border border-slate-800">
                {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-sky-500 to-indigo-500 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom summary bar */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
        <span className="font-mono text-sky-300 text-[11px]">
          filter: {filterValue};
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          {filterParts.length} 個のエフェクト適用中 {showOriginal && '(比較中)'}
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
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Filter 実験室</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              ぼかし・明るさ・明暗・白黒化・彩度・セピア・色相回転で画像やUIを加工する
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
        title="Filter (視覚効果・画像加工)"
        property="filter"
        summary="filter は、要素や画像に対して、ぼかし(blur)、明暗(brightness/contrast)、白黒化(grayscale)、色相回転(hue-rotate)などの画像処理エフェクトをリアルタイムに適用するプロパティです。"
        breakdown={BREAKDOWN}
        tips={TIPS}
        onSelectPropertyKey={setHighlightedProp}
        activeKey={highlightedProp}
      />
    </div>
  );
};
