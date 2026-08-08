import { ThemeConfig, ThemeId } from './types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'cyber',
    name: 'Cyber Sci-Fi Lab',
    nameEn: 'Cyber Dark (Default)',
    description: '近未来サイエンス・ハイテック。ディープスレートに鮮やかなシアン＆スカイブルーの発光アクセント。',
    category: 'dark',
    palette: {
      primary: '#38bdf8', // sky-400
      secondary: '#06b6d4', // cyan-500
      bg: '#020617', // slate-950
      card: '#0f172a', // slate-900
      border: '#1e293b', // slate-800
      text: '#f8fafc', // slate-50
    },
    cssVars: {
      '--lab-bg': '#020617',
      '--lab-header': '#0f172a',
      '--lab-card': '#0f172a',
      '--lab-card-sub': '#020617',
      '--lab-border': '#1e293b',
      '--lab-accent': '#38bdf8',
      '--lab-accent-glow': 'rgba(56, 189, 248, 0.4)',
      '--lab-text': '#f8fafc',
      '--lab-text-muted': '#94a3b8',
    },
  },
  {
    id: 'light',
    name: 'Clean Modern Light',
    nameEn: 'Clean Light & High Contrast',
    description: '日中も見やすく清潔感のあるモダンホワイト。オフホワイト背景にインディゴとサファイアブルーの引き締まったUI。',
    category: 'light',
    palette: {
      primary: '#4f46e5', // indigo-600
      secondary: '#0284c7', // sky-600
      bg: '#f8fafc', // slate-50
      card: '#ffffff', // white
      border: '#e2e8f0', // slate-200
      text: '#0f172a', // slate-900
    },
    cssVars: {
      '--lab-bg': '#f8fafc',
      '--lab-header': '#ffffff',
      '--lab-card': '#ffffff',
      '--lab-card-sub': '#f1f5f9',
      '--lab-border': '#e2e8f0',
      '--lab-accent': '#4f46e5',
      '--lab-accent-glow': 'rgba(79, 70, 229, 0.25)',
      '--lab-text': '#0f172a',
      '--lab-text-muted': '#64748b',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Synthwave',
    nameEn: 'Neon Violet & Deep Purple',
    description: '夜間作業に最適なクリエイティブ・ダーク。ミッドナイトパープルとネオンマゼンタの艶やかな世界観。',
    category: 'dark',
    palette: {
      primary: '#c084fc', // purple-400
      secondary: '#f43f5e', // rose-500
      bg: '#0b0514', // deep violet-black
      card: '#160b2b', // dark violet
      border: '#2c1654', // violet border
      text: '#faf5ff',
    },
    cssVars: {
      '--lab-bg': '#0b0514',
      '--lab-header': '#160b2b',
      '--lab-card': '#160b2b',
      '--lab-card-sub': '#0e061c',
      '--lab-border': '#2c1654',
      '--lab-accent': '#c084fc',
      '--lab-accent-glow': 'rgba(192, 132, 252, 0.4)',
      '--lab-text': '#faf5ff',
      '--lab-text-muted': '#c4b5fd',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    description: 'ハッカー・レトロターミナル風。黒曜石のようなストーンブラックに鮮烈なエメラルドとライムグリーンの発光。',
    nameEn: 'Hacker Matrix Green',
    category: 'dark',
    palette: {
      primary: '#10b981', // emerald-500
      secondary: '#84cc16', // lime-500
      bg: '#05110d', // dark green stone
      card: '#0a1e17',
      border: '#133e2f',
      text: '#ecfdf5',
    },
    cssVars: {
      '--lab-bg': '#05110d',
      '--lab-header': '#0a1e17',
      '--lab-card': '#0a1e17',
      '--lab-card-sub': '#05110d',
      '--lab-border': '#133e2f',
      '--lab-accent': '#10b981',
      '--lab-accent-glow': 'rgba(16, 185, 129, 0.4)',
      '--lab-text': '#ecfdf5',
      '--lab-text-muted': '#6ee7b7',
    },
  },
  {
    id: 'amber',
    name: 'Warm Amber Studio',
    description: 'カフェや上質なデザインスタジオのような温もり。ウォームチャコールに黄金のアンバーとテラコッタ。',
    nameEn: 'Warm Charcoal & Gold',
    category: 'dark',
    palette: {
      primary: '#f59e0b', // amber-500
      secondary: '#f97316', // orange-500
      bg: '#14120e', // warm dark stone
      card: '#221e17',
      border: '#3c3529',
      text: '#fef3c7',
    },
    cssVars: {
      '--lab-bg': '#14120e',
      '--lab-header': '#221e17',
      '--lab-card': '#221e17',
      '--lab-card-sub': '#181510',
      '--lab-border': '#3c3529',
      '--lab-accent': '#f59e0b',
      '--lab-accent-glow': 'rgba(245, 158, 11, 0.4)',
      '--lab-text': '#fef3c7',
      '--lab-text-muted': '#d97706',
    },
  },
  {
    id: 'pastel',
    name: 'Soft Sakura Pastel',
    description: '桜のような優しいローズ＆ラベンダー。親しみやすく目にも優しいソフトトーンのフェミニンパレット。',
    nameEn: 'Soft Rose & Lavender',
    category: 'light',
    palette: {
      primary: '#ec4899', // pink-500
      secondary: '#a855f7', // purple-500
      bg: '#fdf4f5', // soft blush light
      card: '#ffffff',
      border: '#fbcfe8', // soft pink border
      text: '#4a044e',
    },
    cssVars: {
      '--lab-bg': '#fdf4f5',
      '--lab-header': '#ffffff',
      '--lab-card': '#ffffff',
      '--lab-card-sub': '#fdf2f8',
      '--lab-border': '#fbcfe8',
      '--lab-accent': '#ec4899',
      '--lab-accent-glow': 'rgba(236, 72, 153, 0.25)',
      '--lab-text': '#4a044e',
      '--lab-text-muted': '#9d174d',
    },
  },
];

export const DEFAULT_THEME_ID: ThemeId = 'cyber';

export function getThemeById(id: ThemeId): ThemeConfig {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

export function applyThemeToDocument(theme: ThemeConfig) {
  const root = document.documentElement;
  // Apply all CSS variables
  Object.entries(theme.cssVars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });

  // Apply dark / light class to root
  if (theme.category === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }

  // Update theme-specific data attribute
  root.setAttribute('data-theme', theme.id);
}
