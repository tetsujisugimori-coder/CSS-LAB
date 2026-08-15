/**
 * 16進数カラーコードの判定・正規化ユーティリティ
 */

/**
 * 有効な16進カラーコード（#RGB または #RRGGBB）かを厳密に判定する
 */
export function isValidHexColor(hex: string): boolean {
  if (!hex || typeof hex !== 'string') return false;
  const clean = hex.trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(clean);
}

/**
 * 16進カラーコードを標準の #RRGGBB 形式に正規化する
 * 無効な文字列の場合は null を返す
 */
export function normalizeHexColor(hex: string): string | null {
  if (!isValidHexColor(hex)) return null;
  const clean = hex.trim().toLowerCase();
  if (clean.length === 4) {
    const r = clean[1];
    const g = clean[2];
    const b = clean[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return clean;
}
