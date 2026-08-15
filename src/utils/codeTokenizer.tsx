import React from 'react';

export interface CodeToken {
  text: string;
  tokenKey?: string;
  isClickable?: boolean;
}

/**
 * CSSルール文字列を解析し、インタラクティブなトークンリストに分解する
 */
export function tokenizeCss(css: string): (string | { text: string; tokenKey: string })[] {
  if (!css) return [];

  // トークン検出用の正規表現パターン
  // 1. transform 関数: rotate(...), scale(...), translate(...), skew(...)
  // 2. filter 関数: blur(...), brightness(...), contrast(...), grayscale(...), saturate(...), sepia(...), hue-rotate(...), invert(...)
  // 3. box-shadow や border-radius のプロパティ名
  // 4. gradient の角度やカラーコード

  const tokens: (string | { text: string; tokenKey: string })[] = [];

  // 行ごとに処理
  const lines = css.split('\n');
  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) {
      tokens.push('\n');
    }

    // transform: translate(...) rotate(...) scale(...) skew(...)
    if (line.includes('transform:') || line.includes('transform-origin:')) {
      const parts = line.split(/(transform-origin|translateY|translateX|translate|rotate|scale|skewX|skewY|skew)\s*\(([^)]*)\)/g);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (['translate', 'translateX', 'translateY', 'rotate', 'scale', 'skew', 'skewX', 'skewY', 'transform-origin'].includes(p)) {
          const args = parts[i + 1] || '';
          tokens.push({
            text: `${p}(${args})`,
            tokenKey: p === 'translate' ? 'translate' : p === 'skew' ? 'skew' : p,
          });
          i++; // skip args
        } else if (p) {
          // Check for transform property key
          if (p.includes('transform:')) {
            const sub = p.split('transform:');
            tokens.push(sub[0]);
            tokens.push({ text: 'transform', tokenKey: 'transform' });
            tokens.push(':');
            tokens.push(sub[1] || '');
          } else {
            tokens.push(p);
          }
        }
      }
      return;
    }

    // filter: blur(...) brightness(...) etc.
    if (line.includes('filter:')) {
      const parts = line.split(/(blur|brightness|contrast|grayscale|saturate|sepia|hue-rotate|invert|opacity)\s*\(([^)]*)\)/g);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (['blur', 'brightness', 'contrast', 'grayscale', 'saturate', 'sepia', 'hue-rotate', 'invert', 'opacity'].includes(p)) {
          const args = parts[i + 1] || '';
          tokens.push({
            text: `${p}(${args})`,
            tokenKey: p,
          });
          i++; // skip args
        } else if (p) {
          if (p.includes('filter:')) {
            const sub = p.split('filter:');
            tokens.push(sub[0]);
            tokens.push({ text: 'filter', tokenKey: 'filter' });
            tokens.push(':');
            tokens.push(sub[1] || '');
          } else {
            tokens.push(p);
          }
        }
      }
      return;
    }

    // border-radius: ...
    if (line.includes('border-radius:')) {
      const parts = line.split('border-radius:');
      tokens.push(parts[0]);
      tokens.push({ text: 'border-radius', tokenKey: 'all' });
      tokens.push(':');
      if (parts[1]) {
        // e.g. 12px 12px 12px 12px;
        const valParts = parts[1].trim().replace(';', '').split(/\s+/);
        if (valParts.length === 4) {
          tokens.push(' ');
          tokens.push({ text: valParts[0], tokenKey: 'topLeft' });
          tokens.push(' ');
          tokens.push({ text: valParts[1], tokenKey: 'topRight' });
          tokens.push(' ');
          tokens.push({ text: valParts[2], tokenKey: 'bottomRight' });
          tokens.push(' ');
          tokens.push({ text: valParts[3], tokenKey: 'bottomLeft' });
          tokens.push(';');
        } else {
          tokens.push({ text: parts[1], tokenKey: 'all' });
        }
      }
      return;
    }

    // box-shadow: ...
    if (line.includes('box-shadow:')) {
      const parts = line.split('box-shadow:');
      tokens.push(parts[0]);
      tokens.push({ text: 'box-shadow', tokenKey: 'box-shadow' });
      tokens.push(':');
      tokens.push({ text: parts[1] || '', tokenKey: 'box-shadow' });
      return;
    }

    // gradient (background: linear-gradient(...) etc.)
    if (line.includes('linear-gradient') || line.includes('radial-gradient') || line.includes('conic-gradient')) {
      tokens.push({ text: line, tokenKey: 'gradient' });
      return;
    }

    tokens.push(line);
  });

  return tokens;
}
