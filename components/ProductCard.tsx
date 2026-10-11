import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPercent, formatPrice, formatUnit } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const trendColor =
    product.change.dir === "up"
      ? "text-emerald-700 bg-emerald-50"
      : product.change.dir === "down"
        ? "text-rose-700 bg-rose-50"
        : "text-slate-600 bg-slate-100";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      <div className="mb-3 flex h-24 items-center justify-center rounded-xl bg-[#f5f8f2] text-5xl transition group-hover:bg-emerald-50">
        {product.image}
      </div>
      <div className="flex min-h-12 items-start justify-between gap-2">
        <h3 className="font-semibold leading-6 text-slate-900">{product.nameBn}</h3>
        <span className="whitespace-nowrap text-xs text-slate-500">{product.categoryNameBn}</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">{formatUnit(product.unit)}</p>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-slate-500">আজকের দাম</p>
          <p className="font-bold text-emerald-800">{formatPrice(product.today)}</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${trendColor}`}>
          {formatPercent(product.change.pct)}
        </span>
      </div>
    </Link>
  );
}