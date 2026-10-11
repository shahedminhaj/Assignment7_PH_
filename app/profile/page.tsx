"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) return <p className="py-16 text-center text-slate-600">প্রোফাইল লোড হচ্ছে...</p>;
  if (!session) return <p className="py-16 text-center text-slate-600">আপনাকে সাইন ইন করতে হবে।</p>;

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
        👤
      </div>
      <p className="text-sm font-semibold text-emerald-700">আপনার অ্যাকাউন্ট</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900">আমার প্রোফাইল</h1>
      <dl className="mt-7 space-y-4 rounded-2xl bg-slate-50 p-5">
        <div>
          <dt className="text-sm text-slate-500">নাম</dt>
          <dd className="mt-1 font-semibold text-slate-900">{session.user.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">ইমেইল</dt>
          <dd className="mt-1 font-semibold text-slate-900">{session.user.email}</dd>
        </div>
      </dl>
      <Link
        href="/profile/update"
        className="mt-6 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
      >
        তথ্য আপডেট করুন
      </Link>
    </section>
  );
}
