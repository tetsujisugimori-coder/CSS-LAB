import React, { useEffect } from 'react';
import { X, BookOpen, ExternalLink, Code2, Sparkles, Layers } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLab: (labId: any) => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
  onSelectLab,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sheets = [
    {
      id: 'border-radius',
      title: '1. Border Radius (角丸)',
      property: 'border-radius',
      syntax: 'border-radius: 12px; /* または top-left top-right bottom-right bottom-left */',
      summary: '要素の四隅の丸みを定義。50%で円、9999pxでカプセル型ボタンを作成できます。',
      commonValues: ['0px (四角形)', '8px〜16px (モダンカード)', '50% (正方形を円に)', '9999px (ピルボタン)'],
    },
    {
      id: 'box-shadow',
      title: '2. Box Shadow (影・立体感)',
      property: 'box-shadow',
      syntax: 'box-shadow: <offset-x> <offset-y> <blur-radius> <spread-radius> <color> [inset];',
      summary: '要素に光と影を与えてZ軸（浮遊感）を表現。insetをつけると内側の窪み表現になります。',
      commonValues: ['0 4px 6px -1px rgb(0 0 0 / 0.1) (自然なシャドウ)', 'inset 0 2px 4px rgb(0 0 0 / 0.2) (窪みボタン)'],
    },
    {
      id: 'transform',
      title: '3. Transform (2D変形・配置)',
      property: 'transform',
      syntax: 'transform: translate(x, y) rotate(deg) scale(n) skew(x, y);',
      summary: 'レイアウトの流れ（他の要素の位置）を変えずに、GPU描画で視覚的に回転・拡縮・移動・歪みを加えます。',
      commonValues: ['translateY(-4px) (ホバー時の浮き上がり)', 'scale(1.05) (拡大ズーム)', 'rotate(45deg) (回転)'],
    },
    {
      id: 'filter',
      title: '4. Filter (画像・グラフィック効果)',
      property: 'filter',
      syntax: 'filter: blur(px) brightness(%) contrast(%) grayscale(%) hue-rotate(deg);',
      summary: '要素や画像に対して、ぼかし・明暗・白黒化・彩度調整・セピア・色相変更などの後処理エフェクトをかけます。',
      commonValues: ['blur(8px) (背景ぼかし)', 'grayscale(100%) (モノクロ化)', 'brightness(1.2) contrast(1.1) (鮮やかさアップ)'],
    },
    {
      id: 'gradient',
      title: '5. Gradient (グラデーション)',
      property: 'background: gradient',
      syntax: 'linear-gradient(angle, c1, c2) / radial-gradient(...) / conic-gradient(...)',
      summary: '2色以上の滑らかな色の移り変わりを生成。線形(linear)、放射状(radial)、円錐状(conic)があります。',
      commonValues: ['linear-gradient(135deg, #6366f1, #06b6d4)', 'radial-gradient(circle at center, #fff, #000)', 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #00f, #f00)'],
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cheatsheet-title"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 id="cheatsheet-title" className="text-base sm:text-lg font-bold text-white">
                CSS LAB 早見表 & チートシート
              </h2>
              <p className="text-xs text-slate-400">
                5つの主要プロパティの構文とよく使う値を一覧で確認 (Escキーで閉じる)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="モーダルを閉じる"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {sheets.map((s) => (
              <div
                key={s.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {s.title}
                  </h3>
                  <button
                    onClick={() => {
                      onSelectLab(s.id);
                      onClose();
                    }}
                    className="self-start sm:self-auto px-2.5 py-1 rounded bg-sky-950 hover:bg-sky-900 text-sky-300 text-xs font-semibold border border-sky-800/60 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>この実験室を開く</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 mb-2.5 leading-relaxed">
                  {s.summary}
                </p>

                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 mb-2 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>{s.syntax}</code>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-bold">代表的な値:</span>
                  {s.commonValues.map((v, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-md shadow-sky-500/20 cursor-pointer"
          >
            閉じる (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
