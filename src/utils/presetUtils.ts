import { Preset, ColorStop } from '../types';

/**
 * 2つの状態オブジェクトが一致しているかを深く比較する
 */
export function isStateEqual<T extends Record<string, any>>(current: T, presetState: Partial<T>): boolean {
  if (!current || !presetState) return false;

  for (const key of Object.keys(presetState) as (keyof T)[]) {
    const valCurrent = current[key];
    const valPreset = presetState[key];

    if (valPreset === undefined) continue;

    // 配列（Gradientのstopsなど）の場合の比較
    if (Array.isArray(valPreset)) {
      if (!Array.isArray(valCurrent) || valCurrent.length !== valPreset.length) {
        return false;
      }
      for (let i = 0; i < valPreset.length; i++) {
        const itemP = valPreset[i];
        const itemC = valCurrent[i];
        if (typeof itemP === 'object' && itemP !== null) {
          // ColorStop の比較 (idの違いは許容し、colorとstop値で比較)
          if ('color' in itemP && 'stop' in itemP) {
            const stopP = itemP as ColorStop;
            const stopC = itemC as ColorStop;
            const normP = (stopP.color || '').trim().toLowerCase();
            const normC = (stopC.color || '').trim().toLowerCase();
            if (normP !== normC || stopP.stop !== stopC.stop) {
              return false;
            }
          } else if (JSON.stringify(itemP) !== JSON.stringify(itemC)) {
            return false;
          }
        } else if (itemP !== itemC) {
          return false;
        }
      }
      continue;
    }

    // オブジェクトの場合
    if (typeof valPreset === 'object' && valPreset !== null) {
      if (typeof valCurrent !== 'object' || valCurrent === null) return false;
      if (!isStateEqual(valCurrent, valPreset)) return false;
      continue;
    }

    // プリミティブ値の比較
    if (valCurrent !== valPreset) {
      return false;
    }
  }

  return true;
}

/**
 * 現在の状態に完全一致するプリセットIDを検出する
 */
export function findMatchingPresetId<T extends Record<string, any>>(
  state: T,
  presets: Preset<T>[]
): string | undefined {
  for (const preset of presets) {
    if (isStateEqual(state, preset.state)) {
      return preset.id;
    }
  }
  return undefined;
}
