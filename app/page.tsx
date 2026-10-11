import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://bazar-dor-api.vercel.app/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();
  const risers = [...products].sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].sort((a, b) => a.change - b.change).slice(0, 6);
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">▲ দাম বেড়েছে</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {risers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">▼ দাম কমেছে</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {fallers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">📂 ক্যাটাগরি</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/category/${encodeURIComponent(c)}`}
              className="px-4 py-2 rounded-full bg-white border border-slate-200 hover:bg-brand-50"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">🛍️ সব পণ্য</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}