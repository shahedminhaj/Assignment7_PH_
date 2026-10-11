"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import type { Category } from "@/lib/types";
import toast from "react-hot-toast";

export default function Navbar({ categories }: { categories: Category[] }) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি");
        return;
      }
      toast.success("সফলভাবে লগআউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "লগআউট করা যায়নি");
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="min-w-fit">
          <span className="block text-xl font-bold tracking-tight text-emerald-800 sm:text-2xl">
            🛒 বাজার দর
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">{date}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {!isPending && session ? (
            <>
              <Link
                href="/profile"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                প্রোফাইল
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-800 sm:px-3">
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800 sm:px-4"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      <nav aria-label="পণ্যের ক্যাটাগরি" className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          <Link
            href="/"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              pathname === "/" ? "bg-emerald-700 text-white" : "text-slate-600 hover:bg-emerald-50"
            }`}
          >
            সব
          </Link>
          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-emerald-700 text-white" : "text-slate-600 hover:bg-emerald-50"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
