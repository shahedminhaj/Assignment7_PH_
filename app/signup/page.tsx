"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signUp.email({ name, email, password });
      if (error) {
        toast.error(error.message || "সাইনআপ ব্যর্থ");
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
      router.push("/signin");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "সাইনআপ ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[58vh] items-center justify-center py-6">
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(28,66,43,0.06)] sm:p-6">
      <div className="mb-5 text-center">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">🛒</span>
        <h1 className="mt-3 text-xl font-bold text-slate-900">সাইন আপ</h1>
        <p className="mt-1 text-xs text-slate-500">নতুন অ্যাকাউন্ট তৈরি করুন</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required placeholder="নাম" value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-[#fbfcfb] px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <input
          type="email" required placeholder="ইমেইল" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-[#fbfcfb] px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <input
          type="password" required minLength={6} placeholder="পাসওয়ার্ড" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-[#fbfcfb] px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <button
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
        </button>
      </form>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => void signIn.social({ provider: "google", callbackURL: "/" }).catch((error) => toast.error(error instanceof Error ? error.message : "Google দিয়ে সাইন ইন করা যায়নি"))}
          className="rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Google দিয়ে
        </button>
        <button
          type="button"
          onClick={() => void signIn.social({ provider: "github", callbackURL: "/" }).catch((error) => toast.error(error instanceof Error ? error.message : "GitHub দিয়ে সাইন ইন করা যায়নি"))}
          className="rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          GitHub দিয়ে
        </button>
      </div>
      <p className="mt-5 text-center text-xs text-slate-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-brand-600">সাইন ইন</Link>
      </p>
    </div>
    </section>
  );
}