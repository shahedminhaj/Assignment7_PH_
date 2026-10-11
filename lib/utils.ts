const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(input: number | string): string {
  return String(input).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

export function formatPrice(price: number): string {
  return `৳${toBengaliNumber(price.toLocaleString("en-US"))}`;
}

export function formatPercent(pct: number): string {
  const sign = pct > 0 ? "▲" : pct < 0 ? "▼" : "";
  return `${sign} ${toBengaliNumber(Math.abs(pct).toFixed(1))}%`;
}