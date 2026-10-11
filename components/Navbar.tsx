"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success("সফলভাবে লগআউট হয়েছে");
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-700">
          🛒 বাজার দর
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-brand-600">হোম</Link>
          {!isPending && session ? (
            <>
              <Link href="/profile" className="hover:text-brand-600">প্রোফাইল</Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
              >
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="hover:text-brand-600">সাইন ইন</Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 rounded-md bg-brand-600 text-white text-sm hover:bg-brand-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}