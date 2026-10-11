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
      className="group flex min-h-[104px] items-center gap-3 rounded-xl border border-slate-200/90 bg-white/90 p-3 shadow-[0_1px_3px_rgba(25,55,38,0.04)] transition hover:border-emerald-300 hover:bg-white hover:shadow-md sm:gap-4 sm:p-3.5"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f6f0] text-3xl transition group-hover:bg-emerald-50 sm:h-16 sm:w-16 sm:text-4xl">
        {product.image}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold leading-5 text-slate-900">{product.nameBn}</h3>
          <span className="shrink-0 text-[11px] text-slate-500">{product.categoryNameBn}</span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{formatUnit(product.unit)}</p>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] text-slate-500">আজকের দাম</p>
            <p className="text-sm font-bold text-emerald-800">{formatPrice(product.today)}</p>
          </div>
          <span className={`rounded-md px-1.5 py-1 text-[10px] font-semibold sm:text-xs ${trendColor}`}>
            {formatPercent(product.change.pct)}
          </span>
        </div>
      </div>
    </Link>
  );
}