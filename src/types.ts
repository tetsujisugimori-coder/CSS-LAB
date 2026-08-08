export type LabType = 'border-radius' | 'box-shadow' | 'transform' | 'filter' | 'gradient';

export interface LabInfo {
  id: LabType;
  name: string;
  nameEn: string;
  property: string;
  icon: string;
  description: string;
  badge: string;
}

// 1. Border Radius State
export interface BorderRadiusState {
  isUniform: boolean;
  uniform: number;
  all?: number;
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  unit: 'px' | '%';
  showCornerGuides?: boolean;
  previewBg?: 'gradient' | 'solid' | 'glass' | 'pattern';
}

// 2. Box Shadow State
export interface BoxShadowState {
  offsetX: number;
  offsetY: number;
  blur: number;
  blurRadius?: number;
  spread: number;
  spreadRadius?: number;
  color: string;
  shadowColor?: string;
  opacity: number;
  shadowOpacity?: number;
  inset: boolean;
  isInset?: boolean;
  showLightRay?: boolean;
  previewCardType?: 'card' | 'button' | 'avatar' | 'badge';
  secondaryShadowEnabled?: boolean;
}

// 3. Transform State
export interface TransformState {
  rotate: number; // deg
  scale: number; // 0.2 - 2.0
  scaleX: number;
  scaleY: number;
  isUniformScale: boolean;
  translateX: number; // px
  translateY: number; // px
  skewX: number; // deg
  skewY: number; // deg
  origin: string; // 'center' | 'top left' | etc.
  originX?: number; // %
  originY?: number; // %
  showGhostOutline?: boolean;
  showGrid?: boolean;
}

// 4. Filter State
export interface FilterState {
  blur: number; // px
  brightness: number; // %
  contrast: number; // %
  grayscale: number; // %
  saturate: number; // %
  sepia: number; // %
  hueRotate: number; // deg
  opacity: number; // %
  invert: number; // %
  previewSubject: 'illustration' | 'landscape' | 'profile' | 'ui-card';
}

// 5. Gradient State
export type GradientType = 'linear' | 'radial' | 'conic';

export interface ColorStop {
  id: string;
  color: string;
  stop: number; // 0 - 100 (%)
}

export interface GradientState {
  type: GradientType;
  // Linear
  angle: number; // deg
  // Radial
  radialShape: 'circle' | 'ellipse';
  radialPosition: string; // 'center' | 'top left' | 'bottom right' etc.
  // Conic
  conicAngle: number; // deg
  conicPosition: string;
  // Color stops
  stops: ColorStop[];
  previewTarget: 'canvas' | 'text' | 'button' | 'card';
}

// Preset definition
export interface Preset<T> {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  state: Partial<T>;
  previewColor?: string;
}

// Theme types
export type ThemeId = 'cyber' | 'light' | 'midnight' | 'emerald' | 'amber' | 'pastel';

export type UIStyle = 'modern' | 'glass' | 'neobrutal' | 'minimal';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  nameEn: string;
  description: string;
  category: 'dark' | 'light';
  palette: {
    primary: string;
    secondary: string;
    bg: string;
    card: string;
    border: string;
    text: string;
  };
  cssVars: {
    '--lab-bg': string;
    '--lab-header': string;
    '--lab-card': string;
    '--lab-card-sub': string;
    '--lab-border': string;
    '--lab-accent': string;
    '--lab-accent-glow': string;
    '--lab-text': string;
    '--lab-text-muted': string;
  };
}

// Quiz item
export interface QuizQuestion {
  id: number;
  lab: LabType;
  question: string;
  description: string;
  options: {
    label: string;
    css: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  visualHint?: string;
}
