"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Product } from "@/lib/types";
import { formatPercent, formatPrice } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const endpoints = [
        "https://api.api-store.workers.dev/api/bazardor/products",
        "https://api.abcz.workers.dev/api/bazardor/products",
      ];
      let lastError = "বাজারদরের তথ্য লোড করা যায়নি";

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint);
          if (!response.ok) {
            lastError = `বাজারদরের সার্ভারে সমস্যা হয়েছে (${response.status})`;
            continue;
          }
          setProducts((await response.json()) as Product[]);
          return;
        } catch (error) {
          lastError = error instanceof Error ? error.message : lastError;
        }
      }

      toast.error(lastError);
    };

    void loadProducts();
  }, []);

  if (products.length === 0) return null;
  const items = [...products.slice(0, 12), ...products.slice(0, 12)];

  return (
    <div
      aria-label="আজকের পণ্যের দাম"
      className="overflow-hidden border-y border-emerald-100 bg-[#e8f2e9] py-1.5 text-[11px] text-slate-700"
    >
      <div className="flex w-max animate-marquee gap-7 whitespace-nowrap">
        {items.map((product, index) => (
          <span key={`${product.id}-${index}`} className="flex items-center gap-2">
            <span aria-hidden="true">{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span>{formatPrice(product.today)}</span>
            <span className={product.change.dir === "up" ? "font-semibold text-emerald-700" : product.change.dir === "down" ? "font-semibold text-rose-700" : "text-slate-600"}>
              {formatPercent(product.change.pct)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
