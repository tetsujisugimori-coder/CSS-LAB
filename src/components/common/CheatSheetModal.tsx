import React from 'react';
import { X, BookOpen, ExternalLink, Code2, Sparkles, Layers } from 'lucide-react';
import { LabType } from '../../types';
import { Modal } from './Modal';
import { useTheme } from '../../context/ThemeContext';
import { getUIStyleClasses } from '../../utils/uiStyles';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLab: (labId: LabType) => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
  onSelectLab,
}) => {
  const { theme, uiStyle } = useTheme();
  const uiClasses = getUIStyleClasses(uiStyle, theme);

  const sheets: {
    id: LabType;
    title: string;
    property: string;
    syntax: string;
    summary: string;
    commonValues: string[];
  }[] = [
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
      summary: 'レイアウトの流れを変えずに、GPU描画で視覚的に回転・拡縮・移動・歪みを加えます。',
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleId="cheatsheet-title"
      maxWidthClass="max-w-4xl"
    >
      {/* Modal Header */}
      <div className={`p-4 sm:p-5 border-b flex items-center justify-between sticky top-0 backdrop-blur z-10 ${uiClasses.header}`}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 font-bold"
            style={{
              backgroundColor: theme.category === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(79, 70, 229, 0.15)',
              color: theme.palette.primary,
              borderColor: theme.palette.border,
            }}
          >
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 id="cheatsheet-title" className="text-base sm:text-lg font-bold" style={{ color: theme.palette.text }}>
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
          className={`w-8 h-8 flex items-center justify-center transition cursor-pointer ${uiClasses.buttonSecondary}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Scrollable Content */}
      <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-130px)]">
        <div className="grid grid-cols-1 gap-4">
          {sheets.map((sheet) => (
            <div
              key={sheet.id}
              className={`p-4 sm:p-5 transition-all ${uiClasses.subCard}`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 font-bold ${uiClasses.badge}`}>
                    {sheet.property}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base" style={{ color: theme.palette.text }}>
                    {sheet.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    onSelectLab(sheet.id);
                    onClose();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold transition cursor-pointer ${uiClasses.button}`}
                >
                  <span>この実験室を開く</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <p className="text-xs leading-relaxed mb-3 text-slate-400">
                {sheet.summary}
              </p>

              {/* Code syntax */}
              <div className="mb-3">
                <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1">
                  <Code2 className="w-3 h-3" style={{ color: theme.palette.primary }} />
                  <span>基本構文:</span>
                </div>
                <div
                  className="p-2.5 rounded-lg border font-mono text-xs overflow-x-auto"
                  style={{
                    backgroundColor: theme.category === 'dark' ? '#020617' : '#f8fafc',
                    borderColor: theme.palette.border,
                    color: theme.palette.primary,
                  }}
                >
                  <code>{sheet.syntax}</code>
                </div>
              </div>

              {/* Common Values */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5">
                  よく使われる値のパターン:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sheet.commonValues.map((val, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded border font-mono"
                      style={{
                        backgroundColor: theme.category === 'dark' ? '#0f172a' : '#f1f5f9',
                        borderColor: theme.palette.border,
                        color: theme.palette.text,
                      }}
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
