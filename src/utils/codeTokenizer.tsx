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

    // transform-origin: ...
    if (line.includes('transform-origin:')) {
      const parts = line.split('transform-origin:');
      if (parts[0]) tokens.push(parts[0]);
      tokens.push({ text: 'transform-origin', tokenKey: 'transform-origin' });
      tokens.push(':');
      if (parts[1]) {
        const rawVal = parts[1];
        const trimmed = rawVal.trim();
        const hasSemi = trimmed.endsWith(';');
        const valContent = hasSemi ? trimmed.slice(0, -1).trim() : trimmed;
        if (rawVal.startsWith(' ')) tokens.push(' ');
        if (valContent) {
          tokens.push({ text: valContent, tokenKey: 'transform-origin' });
        }
        if (hasSemi) tokens.push(';');
      }
      return;
    }

    // transform: translate(...) rotate(...) scale(...) skew(...)
    if (line.includes('transform:')) {
      const parts = line.split('transform:');
      if (parts[0]) tokens.push(parts[0]);
      tokens.push({ text: 'transform', tokenKey: 'transform' });
      tokens.push(':');

      const rest = parts[1] || '';
      const fnRegex = /(translateX|translateY|translate|rotate|scaleX|scaleY|scale|skewX|skewY|skew)\s*\(([^)]*)\)/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = fnRegex.exec(rest)) !== null) {
        const textBefore = rest.slice(lastIndex, match.index);
        if (textBefore) tokens.push(textBefore);

        const fnName = match[1];
        const fnArgs = match[2];
        const fullFnText = `${fnName}(${fnArgs})`;
        tokens.push({
          text: fullFnText,
          tokenKey: fnName,
        });
        lastIndex = fnRegex.lastIndex;
      }

      const textAfter = rest.slice(lastIndex);
      if (textAfter) {
        tokens.push(textAfter);
      }
      return;
    }

    // filter: blur(...) brightness(...) etc.
    if (line.includes('filter:')) {
      const parts = line.split('filter:');
      if (parts[0]) tokens.push(parts[0]);
      tokens.push({ text: 'filter', tokenKey: 'filter' });
      tokens.push(':');

      const rest = parts[1] || '';
      const fnRegex = /(blur|brightness|contrast|grayscale|saturate|sepia|hue-rotate|invert|opacity)\s*\(([^)]*)\)/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = fnRegex.exec(rest)) !== null) {
        const textBefore = rest.slice(lastIndex, match.index);
        if (textBefore) tokens.push(textBefore);

        const fnName = match[1];
        const fnArgs = match[2];
        tokens.push({
          text: `${fnName}(${fnArgs})`,
          tokenKey: fnName === 'hue-rotate' ? 'hue-rotate' : fnName,
        });
        lastIndex = fnRegex.lastIndex;
      }

      const textAfter = rest.slice(lastIndex);
      if (textAfter) {
        tokens.push(textAfter);
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
