import { notFound } from "next/navigation";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch("https://bazar-dor-api.vercel.app/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const all: Product[] = await res.json();
  return all.find((p) => String(p.id) === id) || null;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const markets = product.markets ?? [{ name: "ঢাকা", price: product.price }];
  const prices = markets.map((m) => m.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="text-7xl text-center mb-4">{product.emoji}</div>
      <h1 className="text-3xl font-bold text-center mb-2">
        {product.nameBn || product.name}
      </h1>
      <p className="text-center text-slate-500 mb-6">{product.category}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-brand-50 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-600">সর্বনিম্ন</p>
          <p className="text-lg font-bold text-brand-700">{formatPrice(min)}</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-600">সর্বোচ্চ</p>
          <p className="text-lg font-bold text-red-600">{formatPrice(max)}</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-600">গড়</p>
          <p className="text-lg font-bold">{formatPrice(Math.round(avg))}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-3">বাজারভিত্তিক মূল্য</h2>
      <div className="divide-y divide-slate-200">
        {markets.map((m, i) => (
          <div key={i} className="flex justify-between py-3">
            <span>{m.name}</span>
            <span className="font-semibold">{formatPrice(m.price)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}