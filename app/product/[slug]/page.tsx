import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import { formatPrice, formatUnit } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const marketAverages = product.markets.map((market) => (market.min + market.max) / 2);
  const minimum = Math.min(...product.markets.map((market) => market.min));
  const maximum = Math.max(...product.markets.map((market) => market.max));
  const average = marketAverages.reduce((sum, price) => sum + price, 0) / marketAverages.length;

  return (
    <article className="mx-auto max-w-4xl">
      <Link href="/" className="mb-3 inline-flex text-xs font-semibold text-emerald-800 hover:underline">
        ← সব পণ্যে ফিরে যান
      </Link>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-4 bg-[#e9f3e9] p-4 sm:p-5 md:grid-cols-[96px_1fr] md:items-center">
          <div className="flex h-20 items-center justify-center rounded-xl bg-white text-5xl shadow-sm">
            {product.image}
          </div>
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600">
                {formatUnit(product.unit)}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{product.nameBn}</h1>
            <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-600">
              {product.nameBn} এর আজকের বাজারদর {formatPrice(product.today)}। বিভিন্ন বাজারের দামের তুলনা দেখুন।
            </p>
            <p className="mt-2 text-[11px] text-slate-500">
              গতকালের তুলনায় {product.change.pct === 0 ? "দাম অপরিবর্তিত" : `${formatPrice(Math.abs(product.today - product.yesterday))} ${product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-3 sm:p-5">
          {[
            { label: "সর্বনিম্ন দাম", value: minimum, color: "text-emerald-800" },
            { label: "সর্বোচ্চ দাম", value: maximum, color: "text-rose-700" },
            { label: "গড় দাম", value: Math.round(average), color: "text-slate-900" },
          ].map((summary) => (
            <div key={summary.label} className="rounded-lg border border-slate-100 bg-[#f8faf8] p-3">
              <p className="text-xs text-slate-600">{summary.label}</p>
              <p className={`mt-1.5 text-base font-bold ${summary.color}`}>{formatPrice(summary.value)}</p>
              <p className="mt-0.5 text-[10px] text-slate-500">{formatUnit(product.unit)}</p>
            </div>
          ))}
        </div>

        <div className="px-4 pb-5 sm:px-5 sm:pb-5">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">বাজারভিত্তিক আজকের দাম</h2>
            <p className="mt-0.5 text-xs text-slate-600">বাজার ও অঞ্চল অনুযায়ী সর্বনিম্ন–সর্বোচ্চ দাম</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">বাজার</th>
                  <th className="px-3 py-2.5 font-semibold">বিভাগ</th>
                  <th className="px-3 py-2.5 text-right font-semibold">সর্বনিম্ন</th>
                  <th className="px-3 py-2.5 text-right font-semibold">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {product.markets.map((market) => (
                  <tr key={`${market.division}-${market.market}`} className="odd:bg-white even:bg-[#f5f8f5]">
                    <td className="px-3 py-2.5 font-medium text-slate-900">{market.market}</td>
                    <td className="px-3 py-2.5 text-slate-600">{market.division}</td>
                    <td className="px-3 py-2.5 text-right text-emerald-800">{formatPrice(market.min)}</td>
                    <td className="px-3 py-2.5 text-right text-slate-900">{formatPrice(market.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </article>
  );
}
