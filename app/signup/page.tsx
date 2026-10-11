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
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">সাইন আপ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required placeholder="নাম" value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
        <input
          type="email" required placeholder="ইমেইল" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
        <input
          type="password" required minLength={6} placeholder="পাসওয়ার্ড" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
        <button
          disabled={loading}
          className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
        </button>
      </form>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => void signIn.social({ provider: "google", callbackURL: "/" }).catch((error) => toast.error(error instanceof Error ? error.message : "Google দিয়ে সাইন ইন করা যায়নি"))}
          className="rounded-lg border border-slate-300 py-2 hover:bg-slate-50"
        >
          Google দিয়ে
        </button>
        <button
          type="button"
          onClick={() => void signIn.social({ provider: "github", callbackURL: "/" }).catch((error) => toast.error(error instanceof Error ? error.message : "GitHub দিয়ে সাইন ইন করা যায়নি"))}
          className="rounded-lg border border-slate-300 py-2 hover:bg-slate-50"
        >
          GitHub দিয়ে
        </button>
      </div>
      <p className="text-center text-sm mt-6">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-brand-600 font-medium">সাইন ইন</Link>
      </p>
    </div>
  );
}