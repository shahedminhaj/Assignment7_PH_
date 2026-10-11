"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  return (
    <Suspense fallback={<p className="py-16 text-center text-slate-600">সাইন ইন পৃষ্ঠা লোড হচ্ছে...</p>}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const requestedRedirect = params.get("redirect");
  const redirect =
    requestedRedirect?.startsWith("/") && !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const redirected = params.get("redirect");

  useEffect(() => {
    if (redirected) toast("পণ্য দেখতে আগে সাইন ইন করুন");
  }, [redirected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({ email, password });
      if (error) {
        toast.error(error.message || "লগইন ব্যর্থ");
        return;
      }
      toast.success("সফলভাবে লগইন হয়েছে");
      router.push(redirect);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "লগইন ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">সাইন ইন</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => void signIn.social({ provider: "google", callbackURL: redirect }).catch((error) => toast.error(error instanceof Error ? error.message : "Google দিয়ে সাইন ইন করা যায়নি"))}
          className="flex-1 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
        >
          Google
        </button>
        <button
          onClick={() => void signIn.social({ provider: "github", callbackURL: redirect }).catch((error) => toast.error(error instanceof Error ? error.message : "GitHub দিয়ে সাইন ইন করা যায়নি"))}
          className="flex-1 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
        >
          GitHub
        </button>
      </div>
      <p className="text-center text-sm mt-6">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-brand-600 font-medium">সাইন আপ</Link>
      </p>
    </div>
  );
}