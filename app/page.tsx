import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import { getCategories, getProducts } from "@/lib/products";

async function HomeContent() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-16 pb-10">
      <section className="relative grid overflow-hidden rounded-[2rem] bg-[#eaf4e8] px-6 py-10 sm:px-10 lg:min-h-[390px] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-14">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-4 inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800">
            বাংলাদেশের প্রতিদিনের বাজারদর
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            বাজারের সঠিক দাম,
            <span className="text-emerald-700"> আপনার হাতেই</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            চাল, ডাল, মাছ, সবজিসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বাজারভিত্তিক তুলনা এক জায়গায়।
          </p>
          <Link
            href="#সব-পণ্য"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            আজকের বাজারদর দেখুন <span className="ml-2" aria-hidden="true">↓</span>
          </Link>
        </div>
        <div className="relative mx-auto mt-8 h-56 w-full max-w-md lg:mt-0 lg:h-80">
          <Image
            src="/bazar-hero.png"
            alt="তাজা বাজারের নিত্যপ্রয়োজনীয় পণ্য"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="object-contain"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
      </section>

      <section aria-labelledby="risers-heading">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700">দৈনিক পরিবর্তন</p>
            <h2 id="risers-heading" className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              আজ দাম বেড়েছে <span className="text-emerald-700">▲</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {risers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section aria-labelledby="fallers-heading">
        <p className="text-sm font-semibold text-rose-700">দৈনিক পরিবর্তন</p>
        <h2 id="fallers-heading" className="mb-5 mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          আজ দাম কমেছে <span className="text-rose-600">▼</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {fallers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section aria-labelledby="categories-heading">
        <div className="mb-5">
          <p className="text-sm font-semibold text-emerald-700">পছন্দের বিভাগ</p>
          <h2 id="categories-heading" className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            পণ্য খুঁজুন ক্যাটাগরিতে
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center font-semibold transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <span className="text-3xl" aria-hidden="true">{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="scroll-mt-8">
        <div className="mb-5">
          <p className="text-sm font-semibold text-emerald-700">হালনাগাদ বাজারদর</p>
          <h2 id="all-products-heading" className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            সব পণ্য
          </h2>
          <p className="mt-2 text-slate-600">আজকের দাম, একক এবং দৈনিক পরিবর্তন এক নজরে দেখুন।</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div className="h-72 animate-pulse rounded-3xl bg-emerald-100 sm:h-80" />
          <ProductGridSkeleton />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
