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
    <article className="mx-auto max-w-5xl">
      <Link href="/" className="mb-5 inline-flex text-sm font-semibold text-emerald-800 hover:underline">
        ← সব পণ্যে ফিরে যান
      </Link>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-10 md:grid-cols-[180px_1fr] md:items-center">
          <div className="flex h-36 items-center justify-center rounded-2xl bg-white text-7xl shadow-sm">
            {product.image}
          </div>
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-600">
                {formatUnit(product.unit)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{product.nameBn}</h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              {product.nameBn} এর আজকের বাজারদর {formatPrice(product.today)}। বিভিন্ন বাজারের দামের তুলনা দেখুন।
            </p>
            <p className="mt-4 text-sm text-slate-500">
              গতকালের তুলনায় {product.change.pct === 0 ? "দাম অপরিবর্তিত" : `${formatPrice(Math.abs(product.today - product.yesterday))} ${product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3 sm:p-8">
          {[
            { label: "সর্বনিম্ন দাম", value: minimum, color: "text-emerald-800" },
            { label: "সর্বোচ্চ দাম", value: maximum, color: "text-rose-700" },
            { label: "গড় দাম", value: Math.round(average), color: "text-slate-900" },
          ].map((summary) => (
            <div key={summary.label} className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-600">{summary.label}</p>
              <p className={`mt-2 text-xl font-bold ${summary.color}`}>{formatPrice(summary.value)}</p>
              <p className="mt-1 text-xs text-slate-500">{formatUnit(product.unit)}</p>
            </div>
          ))}
        </div>

        <div className="px-5 pb-6 sm:px-8 sm:pb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">বাজারভিত্তিক আজকের দাম</h2>
            <p className="mt-1 text-sm text-slate-600">বাজার ও অঞ্চল অনুযায়ী সর্বনিম্ন–সর্বোচ্চ দাম</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">বাজার</th>
                  <th className="px-4 py-3 font-semibold">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-semibold">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {product.markets.map((market) => (
                  <tr key={`${market.division}-${market.market}`} className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">{market.market}</td>
                    <td className="px-4 py-3 text-slate-600">{market.division}</td>
                    <td className="px-4 py-3 text-right text-emerald-800">{formatPrice(market.min)}</td>
                    <td className="px-4 py-3 text-right text-slate-900">{formatPrice(market.max)}</td>
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
