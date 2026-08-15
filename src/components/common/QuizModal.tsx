import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion, LabType } from '../../types';
import { Modal } from './Modal';
import { useTheme } from '../../context/ThemeContext';
import { getUIStyleClasses } from '../../utils/uiStyles';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLab: (labId: LabType) => void;
}

const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    lab: 'border-radius',
    question: '正方形の要素を完全な円（サークル）にするための最も標準的なborder-radiusはどれですか？',
    description: '幅と高さが等しい正方形に対して設定する場合です。',
    options: [
      {
        label: 'border-radius: 10px;',
        css: 'border-radius: 10px;',
        isCorrect: false,
        explanation: '10pxは四角形の角が少し丸くなる程度です。',
      },
      {
        label: 'border-radius: 50%;',
        css: 'border-radius: 50%;',
        isCorrect: true,
        explanation: '正解！幅と高さの50%（半径分）を角丸にすることで、きれいな円になります。',
      },
      {
        label: 'border-radius: 100px 0 100px 0;',
        css: 'border-radius: 100px 0 100px 0;',
        isCorrect: false,
        explanation: 'これは対角の角だけを丸めるため、葉っぱのような形になります。',
      },
    ],
  },
  {
    id: 2,
    lab: 'box-shadow',
    question: 'box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3); の「20px」は何を表していますか？',
    description: '4つの数値指定: X Y blur spread color',
    options: [
      {
        label: '横方向のズレ (offset-x)',
        css: 'offset-x',
        isCorrect: false,
        explanation: '1番目の値「0」が横方向のズレです。',
      },
      {
        label: 'ぼかしの半径 (blur-radius)',
        css: 'blur-radius',
        isCorrect: true,
        explanation: '正解！3番目の値はぼかし半径(blur-radius)で、数字が大きいほど影の輪郭が柔らかくぼやけます。',
      },
      {
        label: '影の広がり (spread-radius)',
        css: 'spread-radius',
        isCorrect: false,
        explanation: '4番目の値「-5px」が影の広がり(spread-radius)です。',
      },
    ],
  },
  {
    id: 3,
    lab: 'transform',
    question: 'ボタンにホバーした時「自然に少しだけ上に浮き上がらせる」にはどのtransformを指定しますか？',
    description: '周囲のレイアウト崩れを防ぎながら視覚的に移動させます。',
    options: [
      {
        label: 'transform: translateY(-4px);',
        css: 'transform: translateY(-4px);',
        isCorrect: true,
        explanation: '正解！マイナスのY座標に移動することで上方向に浮き上がります。周囲の要素の位置もズレません。',
      },
      {
        label: 'transform: rotate(180deg);',
        css: 'transform: rotate(180deg);',
        isCorrect: false,
        explanation: 'これは要素が上下逆さまに半回転してしまいます。',
      },
      {
        label: 'transform: scale(0.5);',
        css: 'transform: scale(0.5);',
        isCorrect: false,
        explanation: 'これは要素が半分のサイズに縮小してしまいます。',
      },
    ],
  },
  {
    id: 4,
    lab: 'filter',
    question: 'カラー写真を完全に「白黒写真（モノクロ）」に変換するfilterはどれですか？',
    description: '写真やアイコンを無彩色にしたい時の指定です。',
    options: [
      {
        label: 'filter: blur(10px);',
        css: 'filter: blur(10px);',
        isCorrect: false,
        explanation: 'blurは画像をぼかす効果です。',
      },
      {
        label: 'filter: grayscale(100%);',
        css: 'filter: grayscale(100%);',
        isCorrect: true,
        explanation: '正解！grayscale(100%)を指定すると、色相・彩度が0になり白黒写真になります。',
      },
      {
        label: 'filter: invert(100%);',
        css: 'filter: invert(100%);',
        isCorrect: false,
        explanation: 'invertはネガポジ反転（色を反転）する効果です。',
      },
    ],
  },
  {
    id: 5,
    lab: 'gradient',
    question: '「左上から右下に向かって」2色が移り変わるグラデーションの標準的な指定はどれですか？',
    description: '方向を角度で指定する場合です。',
    options: [
      {
        label: 'linear-gradient(135deg, #38bdf8, #818cf8);',
        css: 'linear-gradient(135deg, #38bdf8, #818cf8);',
        isCorrect: true,
        explanation: '正解！135deg（または to bottom right）で左上から右下への斜めグラデーションになります。',
      },
      {
        label: 'radial-gradient(circle, #38bdf8, #818cf8);',
        css: 'radial-gradient(circle, #38bdf8, #818cf8);',
        isCorrect: false,
        explanation: 'radial-gradientは中心から円状に広がる放射状グラデーションです。',
      },
      {
        label: 'conic-gradient(#38bdf8, #818cf8);',
        css: 'conic-gradient(#38bdf8, #818cf8);',
        isCorrect: false,
        explanation: 'conic-gradientは時計回りに扇状に広がる円錐グラデーションです。',
      },
    ],
  },
];

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onSelectLab,
}) => {
  const { theme, uiStyle } = useTheme();
  const uiClasses = getUIStyleClasses(uiStyle, theme);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_DATA[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (currentQ.options[idx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_DATA.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [theme.palette.primary, theme.palette.secondary, '#34d399'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CSS理解度チェッククイズ"
      subtitle="実験室で学んだCSSプロパティの知識をテストしてみよう (Escキーで閉じる)"
      icon={<Trophy className="w-4 h-4" />}
      maxWidth="xl"
      footer={
        !isCompleted ? (
          <div className="w-full flex justify-end">
            {selectedOption !== null && (
              <button
                type="button"
                onClick={handleNext}
                className={`px-4 py-2 text-xs font-bold transition shadow-md flex items-center gap-1.5 cursor-pointer ${uiClasses.button}`}
              >
                <span>{currentIdx + 1 === QUIZ_DATA.length ? '結果を見る' : '次の問題へ'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleRestart}
              className={`px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${uiClasses.buttonSecondary}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>もう一度挑戦する</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-bold transition cursor-pointer shadow-md ${uiClasses.button}`}
            >
              実験室に戻る
            </button>
          </div>
        )
      }
    >
      <div className="space-y-4">
        {!isCompleted ? (
          <>
            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>問題 {currentIdx + 1} / {QUIZ_DATA.length}</span>
                <span style={{ color: theme.palette.primary }}>現在のスコア: {score}問正解</span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: theme.category === 'dark' ? '#1e293b' : '#e2e8f0' }}
              >
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentIdx + 1) / QUIZ_DATA.length) * 100}%`,
                    backgroundColor: theme.palette.primary,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div className={`p-4 space-y-1.5 ${uiClasses.subCard}`}>
              <span className={`text-[10px] font-bold font-mono px-2 py-0.5 inline-block ${uiClasses.badge}`}>
                {currentQ.lab.toUpperCase()}
              </span>
              <h3 className="text-sm sm:text-base font-bold leading-snug" style={{ color: theme.palette.text }}>
                {currentQ.question}
              </h3>
              <p className="text-xs text-slate-400">
                {currentQ.description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isAnswered = selectedOption !== null;

                let cardClass = `${uiClasses.subCard} hover:border-slate-400`;
                let customStyle: React.CSSProperties = {
                  color: theme.palette.text,
                };

                if (isAnswered) {
                  if (opt.isCorrect) {
                    cardClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500';
                    customStyle = {};
                  } else if (isSelected && !opt.isCorrect) {
                    cardClass = 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500';
                    customStyle = {};
                  } else {
                    cardClass = 'opacity-50 border-transparent';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${cardClass}`}
                    style={customStyle}
                  >
                    <div className="space-y-1">
                      <span className="text-xs sm:text-sm font-mono font-semibold block">
                        {opt.label}
                      </span>
                    </div>
                    {isAnswered && (
                      <div className="shrink-0">
                        {opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-400 mt-0.5" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation after answer */}
            {selectedOption !== null && (
              <div className={`p-3.5 space-y-1 animate-in fade-in ${uiClasses.subCard}`}>
                <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: theme.palette.primary }}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>解説</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.options[selectedOption].explanation}
                </p>
              </div>
            )}
          </>
        ) : (
          /* Completed Screen */
          <div className="text-center py-6 space-y-4">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white shadow-xl ring-4 ring-slate-800 font-bold"
              style={{ backgroundColor: theme.palette.primary }}
            >
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold" style={{ color: theme.palette.text }}>
                クイズ完了！お疲れ様でした！
              </h3>
              <p className="text-sm text-slate-300">
                あなたのスコア: <span className="font-bold text-lg" style={{ color: theme.palette.primary }}>{score}</span> / {QUIZ_DATA.length} 問正解
              </p>
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {score === QUIZ_DATA.length
                ? '素晴らしい！CSSの主要な視覚プロパティの仕組みを完璧にマスターしています！'
                : '惜しい！各実験室のスライダーを操作して、プロパティの数値変化を再確認してみましょう！'}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
