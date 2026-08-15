# CSS LAB 🧪✨

> **触って、変えて、CSSを深く理解するインタラクティブ実験室**

CSS LAB は、CSSの主要な視覚プロパティ（Border Radius、Box Shadow、Transform、Filter、Gradient）を直感的なスライダーやカラーピッカーで操作し、リアルタイムに生成されるCSSコードとその挙動を学べるWebアプリケーションです。

---

## 🌟 主な機能

### 1. 5つのインタラクティブ実験室 (Labs)
* **Border Radius Lab**: 個別コーナー指定、8値記法（楕円角丸）、アスペクト比連動を視覚的に調整。
* **Box Shadow Lab**: 複数レイヤーの重ねがけ、inset（内側シャドウ）、X/Yオフセット、ぼかし・拡散半径の調整。
* **Transform Lab**: 移動（translate）、回転（rotate）、拡大縮小（scale）、傾斜（skew）、変形の基準点（transform-origin）のリアルタイムプレビュー。
* **Filter Lab**: blur, brightness, contrast, grayscale, saturate, sepia, hue-rotate, invert, opacity などの多段画像フィルター。
* **Gradient Lab**: 線形（linear）および放射状（radial）グラデーション、多段階カラーノード、角度や形状の調整。

### 2. 双方向コードハイライト＆ワンクリックコピー
* 生成されたCSSコードのプロパティにマウスを重ねると、対応するUI操作スライダーが連動してハイライトされます。
* ワンクリックで整形されたCSSをクリップボードにコピー可能。

### 3. 多彩なデザインテーマ & UIスタイル
* **カラーテーマ**: Dark / Light を含む 6 種類のカラーパレット。
* **UI質感モード**:
  * **Modern Futuristic**: 洗練された角丸とグローアクセント。
  * **Frosted Glass**: 美しいすりガラス効果（Glassmorphism）。
  * **Neo-Brutalism**: 太い境界線とソリッドなオフセットシャドウ。
  * **Minimal Clean**: 装飾を削ぎ落とした1pxのミニマルボーダー。

### 4. 学習サポートツール
* **早見表 & チートシート (CheatSheet)**: 5大プロパティの構文と代表的な活用パターンを一覧表示。
* **CSS理解度チェッククイズ (Quiz)**: 実験室で学んだ知識を定着させるインタラクティブなクイズ機能。

---

## 🛠️ 技術スタック

* **フロントエンド**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
* **スタイリング**: [Tailwind CSS v4](https://tailwindcss.com/)
* **アニメーション**: [Motion](https://motion.dev/)
* **アイコン**: [Lucide React](https://lucide.dev/)
* **ビルドツール**: [Vite 6](https://vitejs.dev/)
* **テスト**: [Vitest](https://vitest.dev/)

---

## 🚀 クイックスタート

### 動作環境
* Node.js 18.x 以上
* npm / yarn / pnpm

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/<your-username>/css-lab.git
cd css-lab

# 依存パッケージのインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて動作を確認してください。

### プロダクションビルド

```bash
# TypeScriptの型チェック
npm run lint

# プロダクションビルドの生成 (dist/ に出力)
npm run build

# ビルド成果物のプレビュー
npm run preview
```

---

## 📁 ディレクトリ構成

```text
├── src/
│   ├── components/
│   │   ├── common/         # 共通コンポーネント (Header, Modal, CodePanel, SliderControl など)
│   │   └── labs/           # 5つの実験室コンポーネント (BorderRadiusLab, TransformLab など)
│   ├── context/            # テーマ管理用 Context
│   ├── utils/              # CSS生成、トークナイザー、カラー正規化、UIスタイル定義
│   ├── types.ts            # アプリケーション全体の型定義
│   ├── themes.ts           # カラーテーマプリセット
│   ├── App.tsx             # メインアプリケーション
│   └── main.tsx            # エントリーポイント
├── index.html
├── package.json
└── tsconfig.json
```

---

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
