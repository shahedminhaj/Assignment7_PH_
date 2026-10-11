const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(input: number | string): string {
  return String(input).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

export function formatPrice(price: number): string {
  return `${toBengaliNumber(price.toLocaleString("en-US"))} টাকা`;
}

export function formatPercent(pct: number): string {
  const sign = pct > 0 ? "▲" : pct < 0 ? "▼" : "—";
  return `${sign} ${toBengaliNumber(Math.abs(pct).toFixed(1))}%`;
}

export function formatUnit(unit: string): string {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}