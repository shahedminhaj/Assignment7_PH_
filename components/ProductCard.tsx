import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, formatPercent } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const up = product.change >= 0;
  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition"
    >
      <div className="text-4xl text-center mb-2">{product.emoji}</div>
      <h3 className="font-semibold text-center">{product.nameBn || product.name}</h3>
      <p className="text-center text-brand-700 font-bold mt-1">
        {formatPrice(product.price)}
      </p>
      <p className={`text-center text-sm mt-1 ${up ? "text-green-600" : "text-red-600"}`}>
        {formatPercent(product.change)}
      </p>
    </Link>
  );
}