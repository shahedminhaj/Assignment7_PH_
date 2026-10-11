"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type SortOrder = "default" | "ascending" | "descending";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOrder>("default");
  const sortedProducts = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((a, b) =>
      sort === "ascending" ? a.today - b.today : b.today - a.today
    );
  }, [products, sort]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">{sortedProducts.length}টি পণ্য পাওয়া গেছে</p>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          সাজান:
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="ascending">দাম: কম থেকে বেশি</option>
            <option value="descending">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
