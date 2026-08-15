import {
  BorderRadiusState,
  BoxShadowState,
  TransformState,
  FilterState,
  GradientState,
  ColorStop,
} from '../types';
import { isValidHexColor, normalizeHexColor } from './colorUtils';

export { isValidHexColor, normalizeHexColor };

/**
 * 16進数カラーコードを安全なRGBA文字列に変換する
 */
export function hexToRgba(hex: string, opacity: number): string {
  const sanitized = sanitizeHexColor(hex);
  const r = parseInt(sanitized.slice(1, 3), 16) || 0;
  const g = parseInt(sanitized.slice(3, 5), 16) || 0;
  const b = parseInt(sanitized.slice(5, 7), 16) || 0;
  const alpha = Math.max(0, Math.min(1, Math.round(opacity * 100) / 100));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 16進数カラーコードのサニタイズ（不正な入力時のフォールバック）
 */
export function sanitizeHexColor(hex: string, fallback = '#38bdf8'): string {
  const normalized = normalizeHexColor(hex);
  return normalized || fallback;
}

/* =========================================================================
   1. Border Radius Generators
   ========================================================================= */

export function generateBorderRadiusValue(state: BorderRadiusState): string {
  if (state.isUniform) {
    const uniformVal = state.uniform !== undefined ? state.uniform : (state.all !== undefined ? state.all : 0);
    return `${uniformVal}${state.unit}`;
  }
  return `${state.topLeft}${state.unit} ${state.topRight}${state.unit} ${state.bottomRight}${state.unit} ${state.bottomLeft}${state.unit}`;
}

export function generateBorderRadiusCss(state: BorderRadiusState): string {
  const val = generateBorderRadiusValue(state);
  return `.demo {\n  border-radius: ${val};\n}`;
}

export function generateBorderRadiusInline(state: BorderRadiusState): string {
  const val = generateBorderRadiusValue(state);
  return `style="border-radius: ${val};"`;
}

export function generateBorderRadiusTailwind(state: BorderRadiusState): string {
  if (state.isUniform) {
    const val = state.uniform !== undefined ? state.uniform : (state.all !== undefined ? state.all : 0);
    if (state.unit === '%' && val === 50) return 'rounded-full';
    if (state.unit === 'px' && val >= 999) return 'rounded-full';
    if (state.unit === 'px' && val === 0) return 'rounded-none';
    if (state.unit === 'px' && val === 4) return 'rounded-sm';
    if (state.unit === 'px' && val === 8) return 'rounded-md';
    if (state.unit === 'px' && val === 12) return 'rounded-lg';
    if (state.unit === 'px' && val === 16) return 'rounded-xl';
    if (state.unit === 'px' && val === 24) return 'rounded-2xl';
    if (state.unit === 'px' && val === 32) return 'rounded-3xl';
    return `rounded-[${val}${state.unit}]`;
  }
  const parts: string[] = [];
  if (state.topLeft > 0) parts.push(`rounded-tl-[${state.topLeft}${state.unit}]`);
  if (state.topRight > 0) parts.push(`rounded-tr-[${state.topRight}${state.unit}]`);
  if (state.bottomRight > 0) parts.push(`rounded-br-[${state.bottomRight}${state.unit}]`);
  if (state.bottomLeft > 0) parts.push(`rounded-bl-[${state.bottomLeft}${state.unit}]`);
  return parts.length > 0 ? parts.join(' ') : 'rounded-none';
}

/* =========================================================================
   2. Box Shadow Generators
   ========================================================================= */

export function generateBoxShadowValue(state: BoxShadowState): string {
  const color = state.color || state.shadowColor || '#000000';
  const opacity = state.opacity !== undefined ? state.opacity : (state.shadowOpacity !== undefined ? state.shadowOpacity : 30);
  const blur = state.blur !== undefined ? state.blur : (state.blurRadius !== undefined ? state.blurRadius : 0);
  const spread = state.spread !== undefined ? state.spread : (state.spreadRadius !== undefined ? state.spreadRadius : 0);
  const inset = state.inset !== undefined ? state.inset : (state.isInset !== undefined ? state.isInset : false);

  const rgba = hexToRgba(color, opacity / 100);
  const insetText = inset ? 'inset ' : '';
  return `${insetText}${state.offsetX}px ${state.offsetY}px ${blur}px ${spread}px ${rgba}`;
}

export function generateBoxShadowCss(state: BoxShadowState): string {
  const val = generateBoxShadowValue(state);
  return `.demo {\n  box-shadow: ${val};\n}`;
}

export function generateBoxShadowInline(state: BoxShadowState): string {
  const val = generateBoxShadowValue(state);
  return `style="box-shadow: ${val};"`;
}

export function generateBoxShadowTailwind(state: BoxShadowState): string {
  const color = state.color || state.shadowColor || '#000000';
  const opacity = state.opacity !== undefined ? state.opacity : (state.shadowOpacity !== undefined ? state.shadowOpacity : 30);
  const blur = state.blur !== undefined ? state.blur : (state.blurRadius !== undefined ? state.blurRadius : 0);
  const spread = state.spread !== undefined ? state.spread : (state.spreadRadius !== undefined ? state.spreadRadius : 0);
  const inset = state.inset !== undefined ? state.inset : (state.isInset !== undefined ? state.isInset : false);

  const rgba = hexToRgba(color, opacity / 100);
  const rgbaNoSpaces = rgba.replace(/\s+/g, '');
  const insetText = inset ? 'inset_' : '';
  return `shadow-[${insetText}${state.offsetX}px_${state.offsetY}px_${blur}px_${spread}px_${rgbaNoSpaces}]`;
}

/* =========================================================================
   3. Transform Generators (Fixed Sign & Scale Handling)
   ========================================================================= */

export function generateTransformParts(state: TransformState): string[] {
  const parts: string[] = [];

  // Translate
  if (state.translateX !== 0 || state.translateY !== 0) {
    if (state.translateX !== 0 && state.translateY === 0) {
      parts.push(`translateX(${state.translateX}px)`);
    } else if (state.translateX === 0 && state.translateY !== 0) {
      parts.push(`translateY(${state.translateY}px)`);
    } else {
      parts.push(`translate(${state.translateX}px, ${state.translateY}px)`);
    }
  }

  // Rotate
  if (state.rotate !== 0) {
    parts.push(`rotate(${state.rotate}deg)`);
  }

  // Scale (Handles Uniform and Non-Uniform Scale correctly)
  if (state.isUniformScale) {
    if (state.scale !== 1) {
      parts.push(`scale(${state.scale})`);
    }
  } else {
    if (state.scaleX !== 1 || state.scaleY !== 1) {
      if (state.scaleX !== 1 && state.scaleY === 1) {
        parts.push(`scaleX(${state.scaleX})`);
      } else if (state.scaleX === 1 && state.scaleY !== 1) {
        parts.push(`scaleY(${state.scaleY})`);
      } else {
        parts.push(`scale(${state.scaleX}, ${state.scaleY})`);
      }
    }
  }

  // Skew
  if (state.skewX !== 0 || state.skewY !== 0) {
    if (state.skewX !== 0 && state.skewY === 0) {
      parts.push(`skewX(${state.skewX}deg)`);
    } else if (state.skewX === 0 && state.skewY !== 0) {
      parts.push(`skewY(${state.skewY}deg)`);
    } else {
      parts.push(`skew(${state.skewX}deg, ${state.skewY}deg)`);
    }
  }

  return parts;
}

export function generateTransformValue(state: TransformState): string {
  const parts = generateTransformParts(state);
  return parts.length > 0 ? parts.join(' ') : 'none';
}

export function generateTransformCss(state: TransformState): string {
  const transformVal = generateTransformValue(state);
  let css = `.demo {\n  transform: ${transformVal};`;
  if (state.originX !== undefined && state.originY !== undefined) {
    if (state.originX !== 50 || state.originY !== 50) {
      css += `\n  transform-origin: ${state.originX}% ${state.originY}%;`;
    }
  } else if (state.origin && state.origin !== 'center' && state.origin !== '50% 50%') {
    css += `\n  transform-origin: ${state.origin};`;
  }
  css += '\n}';
  return css;
}

export function generateTransformInline(state: TransformState): string {
  const transformVal = generateTransformValue(state);
  let inline = `style="transform: ${transformVal};`;
  if (state.originX !== undefined && state.originY !== undefined) {
    if (state.originX !== 50 || state.originY !== 50) {
      inline += ` transform-origin: ${state.originX}% ${state.originY}%;`;
    }
  } else if (state.origin && state.origin !== 'center' && state.origin !== '50% 50%') {
    inline += ` transform-origin: ${state.origin};`;
  }
  inline += '"';
  return inline;
}

export function generateTransformTailwind(state: TransformState): string {
  const classes: string[] = [];

  // Translate X
  if (state.translateX > 0) {
    classes.push(`translate-x-[${state.translateX}px]`);
  } else if (state.translateX < 0) {
    classes.push(`-translate-x-[${Math.abs(state.translateX)}px]`);
  }

  // Translate Y
  if (state.translateY > 0) {
    classes.push(`translate-y-[${state.translateY}px]`);
  } else if (state.translateY < 0) {
    classes.push(`-translate-y-[${Math.abs(state.translateY)}px]`);
  }

  // Rotate
  if (state.rotate > 0) {
    classes.push(`rotate-[${state.rotate}deg]`);
  } else if (state.rotate < 0) {
    classes.push(`-rotate-[${Math.abs(state.rotate)}deg]`);
  }

  // Scale
  if (state.isUniformScale) {
    if (state.scale !== 1) {
      classes.push(`scale-[${state.scale}]`);
    }
  } else {
    if (state.scaleX !== 1) {
      classes.push(`scale-x-[${state.scaleX}]`);
    }
    if (state.scaleY !== 1) {
      classes.push(`scale-y-[${state.scaleY}]`);
    }
  }

  // Skew X
  if (state.skewX > 0) {
    classes.push(`skew-x-[${state.skewX}deg]`);
  } else if (state.skewX < 0) {
    classes.push(`-skew-x-[${Math.abs(state.skewX)}deg]`);
  }

  // Skew Y
  if (state.skewY > 0) {
    classes.push(`skew-y-[${state.skewY}deg]`);
  } else if (state.skewY < 0) {
    classes.push(`-skew-y-[${Math.abs(state.skewY)}deg]`);
  }

  // Origin
  const ox = state.originX;
  const oy = state.originY;
  if (ox !== undefined && oy !== undefined) {
    if (ox !== 50 || oy !== 50) {
      if (ox === 0 && oy === 0) classes.push('origin-top-left');
      else if (ox === 50 && oy === 0) classes.push('origin-top');
      else if (ox === 100 && oy === 0) classes.push('origin-top-right');
      else if (ox === 0 && oy === 50) classes.push('origin-left');
      else if (ox === 100 && oy === 50) classes.push('origin-right');
      else if (ox === 0 && oy === 100) classes.push('origin-bottom-left');
      else if (ox === 50 && oy === 100) classes.push('origin-bottom');
      else if (ox === 100 && oy === 100) classes.push('origin-bottom-right');
      else classes.push(`origin-[${ox}%_${oy}%]`);
    }
  } else if (state.origin && state.origin !== 'center') {
    if (state.origin === 'top left') classes.push('origin-top-left');
    else if (state.origin === 'top') classes.push('origin-top');
    else if (state.origin === 'top right') classes.push('origin-top-right');
    else if (state.origin === 'left') classes.push('origin-left');
    else if (state.origin === 'right') classes.push('origin-right');
    else if (state.origin === 'bottom left') classes.push('origin-bottom-left');
    else if (state.origin === 'bottom') classes.push('origin-bottom');
    else if (state.origin === 'bottom right') classes.push('origin-bottom-right');
  }

  return classes.length > 0 ? classes.join(' ') : 'transform-none';
}

/* =========================================================================
   4. Filter Generators
   ========================================================================= */

export function generateFilterParts(state: FilterState): string[] {
  const parts: string[] = [];
  if (state.blur > 0) parts.push(`blur(${state.blur}px)`);
  if (state.brightness !== 100) parts.push(`brightness(${state.brightness}%)`);
  if (state.contrast !== 100) parts.push(`contrast(${state.contrast}%)`);
  if (state.grayscale > 0) parts.push(`grayscale(${state.grayscale}%)`);
  if (state.saturate !== 100) parts.push(`saturate(${state.saturate}%)`);
  if (state.sepia > 0) parts.push(`sepia(${state.sepia}%)`);
  if (state.hueRotate !== 0) parts.push(`hue-rotate(${state.hueRotate}deg)`);
  if (state.opacity !== 100) parts.push(`opacity(${state.opacity}%)`);
  if (state.invert > 0) parts.push(`invert(${state.invert}%)`);
  return parts;
}

export function generateFilterValue(state: FilterState): string {
  const parts = generateFilterParts(state);
  return parts.length > 0 ? parts.join(' ') : 'none';
}

export function generateFilterCss(state: FilterState): string {
  const val = generateFilterValue(state);
  return `.demo {\n  filter: ${val};\n}`;
}

export function generateFilterInline(state: FilterState): string {
  const val = generateFilterValue(state);
  return `style="filter: ${val};"`;
}

export function generateFilterTailwind(state: FilterState): string {
  const classes: string[] = [];
  if (state.blur > 0) classes.push(`blur-[${state.blur}px]`);
  if (state.brightness !== 100) classes.push(`brightness-[${state.brightness}%]`);
  if (state.contrast !== 100) classes.push(`contrast-[${state.contrast}%]`);
  if (state.grayscale > 0) {
    if (state.grayscale === 100) classes.push('grayscale');
    else classes.push(`grayscale-[${state.grayscale}%]`);
  }
  if (state.saturate !== 100) classes.push(`saturate-[${state.saturate}%]`);
  if (state.sepia > 0) {
    if (state.sepia === 100) classes.push('sepia');
    else classes.push(`sepia-[${state.sepia}%]`);
  }
  if (state.hueRotate !== 0) classes.push(`hue-rotate-[${state.hueRotate}deg]`);
  if (state.invert > 0) {
    if (state.invert === 100) classes.push('invert');
    else classes.push(`invert-[${state.invert}%]`);
  }
  if (state.opacity !== 100) classes.push(`opacity-[${state.opacity}%]`);
  return classes.length > 0 ? classes.join(' ') : 'filter-none';
}

/* =========================================================================
   5. Gradient Generators
   ========================================================================= */

export function generateGradientValue(state: GradientState): string {
  const sortedStops = [...state.stops].sort((a, b) => a.stop - b.stop);
  const stopsString = sortedStops
    .map((s) => `${sanitizeHexColor(s.color)} ${s.stop}%`)
    .join(', ');

  if (state.type === 'linear') {
    return `linear-gradient(${state.angle}deg, ${stopsString})`;
  } else if (state.type === 'radial') {
    return `radial-gradient(${state.radialShape} at ${state.radialPosition}, ${stopsString})`;
  } else if (state.type === 'conic') {
    return `conic-gradient(from ${state.conicAngle}deg ${state.conicPosition}, ${stopsString})`;
  }
  return `linear-gradient(135deg, ${stopsString})`;
}

export function generateGradientCss(state: GradientState): string {
  const val = generateGradientValue(state);
  return `.demo {\n  background: ${val};\n}`;
}

export function generateGradientInline(state: GradientState): string {
  const val = generateGradientValue(state);
  return `style="background: ${val};"`;
}

export function generateGradientTailwind(state: GradientState): string {
  const val = generateGradientValue(state);
  const noSpace = val.replace(/\s*,\s*/g, ',').replace(/\s+/g, '_');
  return `bg-[${noSpace}]`;
}
