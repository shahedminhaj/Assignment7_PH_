"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) return <p className="py-16 text-center text-slate-600">প্রোফাইল লোড হচ্ছে...</p>;
  if (!session) return <p className="py-16 text-center text-slate-600">আপনাকে সাইন ইন করতে হবে।</p>;

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-4">
        <p className="text-xs font-semibold text-emerald-700">আপনার অ্যাকাউন্ট</p>
        <h1 className="mt-1 text-xl font-bold text-slate-900">আমার প্রোফাইল</h1>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
            👤
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{session.user.name}</p>
            <p className="truncate text-xs text-slate-500">{session.user.email}</p>
          </div>
        </div>
        <Link
          href="/profile/update"
          className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
        >
          তথ্য আপডেট
        </Link>
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900">অ্যাকাউন্টের তথ্য</h2>
        <p className="mt-1 text-xs text-slate-500">আপনার প্রোফাইলের তথ্য এখানে দেখা যাবে।</p>
        <div className="mt-4">
          <p className="mb-1 text-xs font-medium text-slate-600">নাম</p>
          <div className="rounded-lg border border-slate-200 bg-[#fbfcfb] px-3 py-2.5 text-sm text-slate-700">
            {session.user.name}
          </div>
        </div>
      </div>
    </section>
  );
}
