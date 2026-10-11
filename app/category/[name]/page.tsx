"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("https://bazar-dor-api.vercel.app/products")
      .then((r) => r.json())
      .then((data) =>
        setProducts(data.filter((p: Product) => p.category === decodeURIComponent(name)))
      )
      .finally(() => setLoading(false));
  }, [name]);

  const sorted = useMemo(
    () => [...products].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price)),
    [products, sort]
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-40 bg-slate-200 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-xl text-slate-600">এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{decodeURIComponent(name)}</h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="px-3 py-2 rounded-md border border-slate-300 bg-white"
        >
          <option value="asc">কম থেকে বেশি</option>
          <option value="desc">বেশি থেকে কম</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}