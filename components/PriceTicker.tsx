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
      className="overflow-hidden bg-emerald-800 py-2.5 text-sm text-white"
    >
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {items.map((product, index) => (
          <span key={`${product.id}-${index}`} className="flex items-center gap-2">
            <span aria-hidden="true">{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span>{formatPrice(product.today)}</span>
            <span className={product.change.dir === "up" ? "text-emerald-200" : product.change.dir === "down" ? "text-rose-200" : "text-slate-200"}>
              {formatPercent(product.change.pct)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
