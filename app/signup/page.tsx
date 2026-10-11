"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
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
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "সাইনআপ ব্যর্থ");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
    router.push("/");
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
          type="password" required placeholder="পাসওয়ার্ড" value={password}
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
      <p className="text-center text-sm mt-6">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-brand-600 font-medium">সাইন ইন</Link>
      </p>
    </div>
  );
}