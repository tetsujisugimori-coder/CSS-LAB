# CSS LAB 🧪✨

> **触って、変えて、CSSを深く理解するインタラクティブ実験室**

CSS LAB は、CSSの主要な視覚プロパティ（Border Radius、Box Shadow、Transform、Filter、Gradient）を直感的なスライダーやカラーピッカーで操作し、リアルタイムに生成されるCSSコードとその挙動を学べるWebアプリケーションです。

---

## デモ

[CSS LABを試す](https://tetsujisugimori-coder.github.io/CSS-LAB/)

---

## 🌟 主な機能

### 1. 5つのインタラクティブ実験室 (Labs)
* **Border Radius Lab**: 一括・4隅個別指定、単位切替（px / %）、リアルタイム角丸ガイド表示。
* **Box Shadow Lab**: X/Yオフセット、ぼかし（Blur）、拡散（Spread）、不透明度、内側シャドウ（inset）、光源ガイド表示。
* **Transform Lab**: 移動（translate）、回転（rotate）、拡大縮小（scale / scaleX / scaleY）、傾斜（skew）、変形基準点（transform-origin 9点・カスタムXY%）のプレビュー。
* **Filter Lab**: blur, brightness, contrast, grayscale, saturate, sepia, hue-rotate, invert, opacity の多段フィルター調整。
* **Gradient Lab**: 線形（linear）、放射状（radial）、円錐・扇状（conic）グラデーション対応、多段階カラーノード、角度や形状・位置の調整。

### 2. 双方向コードハイライト＆ワンクリックコピー
* 生成されたCSSコードのプロパティ値にホバーすると、対応するUI操作スライダーが連動してハイライトされます。
* CSS ルール、インラインスタイル、Tailwind CSS クラス形式のワンクリックコピーに対応。

### 3. 多彩なデザインテーマ & UI質感モード
* **カラーテーマ (6種類)**: Cyber Sci-Fi Lab（デフォルト）, Clean Modern Light, Midnight Synthwave, Emerald Forest, Amber Warmth, Soft Sakura Pastel
* **UI質感モード (4種類)**:
  * **Modern Futuristic**: 洗練された角丸とグローアクセント。
  * **Frosted Glass**: 美しいすりガラス効果（Glassmorphism）。
  * **Neo-Brutalism**: 太い境界線とソリッドなオフセットシャドウ。
  * **Minimal Clean**: 装飾を削ぎ落とした1pxのミニマルボーダー。

### 4. 学習サポートツール
* **早見表 & チートシート (CheatSheet)**: 5大プロパティの基本構文と代表的な活用パターンを一覧表示。
* **CSS理解度チェッククイズ (Quiz)**: 実験室で学んだ知識を定着させるインタラクティブなクイズ機能。

---

## 🚀 今後の予定

- Border Radius の8値記法（水平/垂直半径スラッシュ構文）への対応
- Box Shadow の複数レイヤー重ねがけ編集機能

---

## 🛠️ 技術スタック

* **フロントエンド**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
* **スタイリング**: [Tailwind CSS v4](https://tailwindcss.com/)
* **アニメーション**: [Motion](https://motion.dev/)
* **アイコン**: [Lucide React](https://lucide.dev/)
* **ビルドツール**: [Vite 6](https://vitejs.dev/)

---

## 💻 クイックスタート

### 動作環境
* Node.js 18.x 以上
* npm / yarn / pnpm

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/tetsujisugimori-coder/CSS-LAB.git
cd CSS-LAB

# 依存パッケージのインストール
npm install
```

### 開発用コマンド

```bash
# 開発サーバーの起動 (http://localhost:3000)
npm run dev

# TypeScriptの型チェック (tsc --noEmit)
npm run lint

# プロダクションビルドの生成 (dist/ に出力)
npm run build

# ビルド成果物のローカルプレビュー
npm run preview
```

---

## 📁 ディレクトリ構成

```text
├── src/
│   ├── components/
│   │   ├── common/         # 共通UI (Header, Modal, CodePanel, SliderControl など)
│   │   └── labs/           # 5つの実験室コンポーネント (BorderRadiusLab, TransformLab など)
│   ├── context/            # テーマ管理用 Context (ThemeContext)
│   ├── utils/              # CSS生成、トークナイザー、カラー正規化、UIスタイル定義
│   ├── types.ts            # アプリケーション全体の型定義
│   ├── themes.ts           # カラーテーマプリセット
│   ├── App.tsx             # メインアプリケーション
│   └── main.tsx            # エントリーポイント
├── LICENSE                 # MIT License
├── README.md               # プロジェクトドキュメント
├── index.html
├── package.json
└── tsconfig.json
```

---

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
