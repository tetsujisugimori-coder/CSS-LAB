import { describe, it, expect } from 'vitest';
import {
  generateBorderRadiusValue,
  generateBorderRadiusCss,
  generateBorderRadiusInline,
  generateBorderRadiusTailwind,
  generateBoxShadowValue,
  generateBoxShadowCss,
  generateBoxShadowInline,
  generateBoxShadowTailwind,
  generateTransformValue,
  generateTransformCss,
  generateTransformInline,
  generateTransformTailwind,
  generateFilterValue,
  generateFilterCss,
  generateFilterInline,
  generateFilterTailwind,
  generateGradientValue,
  generateGradientCss,
  generateGradientInline,
  generateGradientTailwind,
} from './cssGenerators';
import {
  BorderRadiusState,
  BoxShadowState,
  TransformState,
  FilterState,
  GradientState,
} from '../types';

describe('CSS Generators - Pure Functions', () => {
  describe('Border Radius Generator', () => {
    it('generates uniform border radius in simple mode', () => {
      const state: BorderRadiusState = {
        isUniform: true,
        uniform: 16,
        all: 16,
        topLeft: 16,
        topRight: 16,
        bottomRight: 16,
        bottomLeft: 16,
        unit: 'px',
      };

      expect(generateBorderRadiusValue(state)).toBe('16px');
      expect(generateBorderRadiusCss(state)).toContain('border-radius: 16px;');
      expect(generateBorderRadiusInline(state)).toBe('style="border-radius: 16px;"');
      expect(generateBorderRadiusTailwind(state)).toBe('rounded-xl');
    });

    it('generates 4-corner individual border radius in advanced mode', () => {
      const state: BorderRadiusState = {
        isUniform: false,
        uniform: 16,
        all: 16,
        topLeft: 10,
        topRight: 20,
        bottomRight: 30,
        bottomLeft: 40,
        unit: 'px',
      };

      expect(generateBorderRadiusValue(state)).toBe('10px 20px 30px 40px');
      expect(generateBorderRadiusCss(state)).toContain('border-radius: 10px 20px 30px 40px;');
      expect(generateBorderRadiusTailwind(state)).toBe('rounded-tl-[10px] rounded-tr-[20px] rounded-br-[30px] rounded-bl-[40px]');
    });
  });

  describe('Box Shadow Generator', () => {
    it('generates standard box shadow string', () => {
      const state: BoxShadowState = {
        offsetX: 0,
        offsetY: 10,
        blur: 15,
        spread: -3,
        color: '#000000',
        opacity: 20,
        inset: false,
      };

      const val = generateBoxShadowValue(state);
      expect(val).toContain('0px 10px 15px -3px');
      expect(val).toContain('rgba(0, 0, 0, 0.2)');
      expect(generateBoxShadowCss(state)).toContain(`box-shadow: ${val};`);
      expect(generateBoxShadowTailwind(state)).toContain('shadow-');
    });

    it('handles inset shadow properly', () => {
      const state: BoxShadowState = {
        offsetX: 2,
        offsetY: 2,
        blur: 4,
        spread: 0,
        color: '#000000',
        opacity: 25,
        inset: true,
      };

      const val = generateBoxShadowValue(state);
      expect(val).toContain('inset');
      expect(val).toContain('2px 2px 4px 0px');
    });
  });

  describe('Transform Generator', () => {
    it('generates 2D transform string with active parameters', () => {
      const state: TransformState = {
        translateX: 20,
        translateY: -10,
        rotate: 45,
        scale: 1.2,
        scaleX: 1.2,
        scaleY: 1.2,
        isUniformScale: true,
        skewX: 5,
        skewY: 0,
        origin: 'center',
      };

      const val = generateTransformValue(state);
      expect(val).toBe('translate(20px, -10px) rotate(45deg) scale(1.2) skewX(5deg)');
      expect(generateTransformCss(state)).toContain(`transform: ${val};`);
      expect(generateTransformTailwind(state)).toContain('translate-x-');
    });

    it('returns none if transform is at identity state', () => {
      const state: TransformState = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        isUniformScale: true,
        skewX: 0,
        skewY: 0,
        origin: 'center',
      };

      expect(generateTransformValue(state)).toBe('none');
    });
  });

  describe('Filter Generator', () => {
    it('generates multi-part CSS filter string', () => {
      const state: FilterState = {
        blur: 4,
        brightness: 110,
        contrast: 120,
        grayscale: 50,
        saturate: 100,
        sepia: 0,
        hueRotate: 90,
        opacity: 100,
        invert: 0,
        previewSubject: 'illustration',
      };

      const val = generateFilterValue(state);
      expect(val).toContain('blur(4px)');
      expect(val).toContain('brightness(110%)');
      expect(val).toContain('contrast(120%)');
      expect(val).toContain('grayscale(50%)');
      expect(val).toContain('hue-rotate(90deg)');
      expect(generateFilterCss(state)).toContain(`filter: ${val};`);
    });

    it('returns none when no filters are altered', () => {
      const state: FilterState = {
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

      expect(generateFilterValue(state)).toBe('none');
    });
  });

  describe('Gradient Generator', () => {
    it('generates linear-gradient string with stops', () => {
      const state: GradientState = {
        type: 'linear',
        angle: 135,
        radialShape: 'circle',
        radialPosition: 'center',
        conicAngle: 0,
        conicPosition: 'at center',
        stops: [
          { id: '1', color: '#ff7e5f', stop: 0 },
          { id: '2', color: '#feb47b', stop: 100 },
        ],
        previewTarget: 'canvas',
      };

      const val = generateGradientValue(state);
      expect(val).toBe('linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)');
      expect(generateGradientCss(state)).toContain(`background: ${val};`);
    });

    it('generates radial-gradient string', () => {
      const state: GradientState = {
        type: 'radial',
        angle: 0,
        radialShape: 'circle',
        radialPosition: 'center',
        conicAngle: 0,
        conicPosition: 'at center',
        stops: [
          { id: '1', color: '#ffffff', stop: 0 },
          { id: '2', color: '#000000', stop: 100 },
        ],
        previewTarget: 'canvas',
      };

      expect(generateGradientValue(state)).toBe('radial-gradient(circle at center, #ffffff 0%, #000000 100%)');
    });

    it('generates conic-gradient string', () => {
      const state: GradientState = {
        type: 'conic',
        angle: 0,
        radialShape: 'circle',
        radialPosition: 'center',
        conicAngle: 45,
        conicPosition: 'at center',
        stops: [
          { id: '1', color: '#ff0000', stop: 0 },
          { id: '2', color: '#00ff00', stop: 100 },
        ],
        previewTarget: 'canvas',
      };

      expect(generateGradientValue(state)).toBe('conic-gradient(from 45deg at center, #ff0000 0%, #00ff00 100%)');
    });
  });
});
