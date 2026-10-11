import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import { getProducts } from "@/lib/products";

async function HomeContent() {
  const products = await getProducts();
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-9 pb-8">
      <section className="relative grid overflow-hidden rounded-2xl border border-emerald-100 bg-[#e9f3e9] px-5 py-6 sm:px-8 sm:py-7 md:min-h-[190px] md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-10">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-800">
            {date}
          </p>
          <h1 className="max-w-xl text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link
            href="#সব-পণ্য"
            className="mt-4 inline-flex min-h-9 items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            আজকের বাজারদর দেখুন <span className="ml-2" aria-hidden="true">↓</span>
          </Link>
        </div>
        <div className="relative mx-auto mt-4 h-32 w-full max-w-[220px] md:mt-0 md:h-36">
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
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-emerald-700">দৈনিক পরিবর্তন</p>
            <h2 id="risers-heading" className="mt-0.5 text-lg font-bold text-slate-900 sm:text-xl">
              আজ দাম বেড়েছে <span className="text-emerald-700">▲</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {risers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section aria-labelledby="fallers-heading">
        <p className="text-[11px] font-semibold text-rose-700">দৈনিক পরিবর্তন</p>
        <h2 id="fallers-heading" className="mb-3 mt-0.5 text-lg font-bold text-slate-900 sm:text-xl">
          আজ দাম কমেছে <span className="text-rose-600">▼</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {fallers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="scroll-mt-8">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-emerald-700">হালনাগাদ বাজারদর</p>
          <h2 id="all-products-heading" className="mt-0.5 text-lg font-bold text-slate-900 sm:text-xl">
            সব পণ্য
          </h2>
          <p className="mt-1 text-xs text-slate-600">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
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
