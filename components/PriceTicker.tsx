"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { formatPrice, formatPercent } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://bazar-dor-api.vercel.app/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.slice(0, 12)))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div className="bg-brand-600 text-white overflow-hidden py-2 text-sm">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {items.map((p, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>{p.emoji}</span>
            <span className="font-medium">{p.name}</span>
            <span>{formatPrice(p.price)}</span>
            <span className={p.change >= 0 ? "text-green-200" : "text-red-200"}>
              {formatPercent(p.change)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}