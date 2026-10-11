"use client";

import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error("তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
  }, []);

  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <p className="mb-4 text-5xl" aria-hidden="true">⚠️</p>
      <h1 className="text-2xl font-bold text-slate-900">তথ্য দেখানো যাচ্ছে না</h1>
      <p className="mt-2 text-slate-600">{error.message || "একটি অপ্রত্যাশিত সমস্যা হয়েছে।"}</p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          আবার চেষ্টা করুন
        </button>
        <Link href="/" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700">
          হোম পেজ
        </Link>
      </div>
    </div>
  );
}
