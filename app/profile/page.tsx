"use client";

import { useEffect, useState } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await updateUser({ name });
    setSaving(false);
    if (error) return toast.error("আপডেট ব্যর্থ");
    toast.success("প্রোফাইল আপডেট হয়েছে");
  };

  if (isPending) return <p className="text-center py-10">লোড হচ্ছে...</p>;
  if (!session) return <p className="text-center py-10">লগইন করুন</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">প্রোফাইল</h1>
      <p className="text-slate-600 mb-4 text-center">{session.user.email}</p>
      <form onSubmit={handleSave} className="space-y-4">
        <label className="block text-sm font-medium">প্রদর্শিত নাম</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
        <button
          disabled={saving}
          className="w-full py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "সংরক্ষণ..." : "সংরক্ষণ করুন"}
        </button>
      </form>
    </div>
  );
}