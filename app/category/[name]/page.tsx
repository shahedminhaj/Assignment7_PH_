import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import { categories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const category = categories.find((item) => item.slug === name);
  if (!category) notFound();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-100 bg-[#e9f3e9] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">{category.icon}</span>
          <div>
            <p className="text-[10px] font-semibold text-emerald-700">পণ্যের ক্যাটাগরি</p>
            <h1 className="mt-0.5 text-lg font-bold text-slate-900">{category.nameBn}</h1>
          </div>
        </div>
      </div>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CategoryListing slug={category.slug} />
      </Suspense>
    </section>
  );
}

async function CategoryListing({ slug }: { slug: string }) {
  const products = (await getProducts()).filter((product) => product.category === slug);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <p className="mb-4 text-6xl" aria-hidden="true">🔍</p>
        <h1 className="text-2xl font-bold text-slate-900">এই ক্যাটাগরিতে কোনো পণ্য নেই</h1>
        <p className="mt-2 text-slate-600">অন্য ক্যাটাগরি থেকে পণ্য দেখুন।</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return <CategoryProducts products={products} />;
}
