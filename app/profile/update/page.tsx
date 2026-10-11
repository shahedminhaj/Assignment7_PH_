"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      if (typeof name !== "string" || name.trim().length < 2) {
        toast.error("কমপক্ষে ২ অক্ষরের নাম লিখুন");
        return;
      }
      const { error } = await updateUser({ name: name.trim() });
      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }
      toast.success("প্রোফাইলের তথ্য আপডেট হয়েছে");
      router.push("/profile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "তথ্য আপডেট করা যায়নি");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) return <p className="py-16 text-center text-slate-600">প্রোফাইল লোড হচ্ছে...</p>;
  if (!session) return <p className="py-16 text-center text-slate-600">আপনাকে সাইন ইন করতে হবে।</p>;

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
      <Link href="/profile" className="text-sm font-semibold text-emerald-800 hover:underline">
        ← প্রোফাইলে ফিরে যান
      </Link>
      <h1 className="mt-5 text-3xl font-bold text-slate-900">তথ্য আপডেট</h1>
      <p className="mt-2 text-slate-600">আপনার অ্যাকাউন্টে প্রদর্শিত নাম পরিবর্তন করুন।</p>
      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <label htmlFor="profile-name" className="block text-sm font-semibold text-slate-700">
          নাম
        </label>
        <input
          id="profile-name"
          name="name"
          required
          minLength={2}
          defaultValue={session.user.name}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
        <button
          disabled={saving}
          className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
        >
          {saving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </section>
  );
}
