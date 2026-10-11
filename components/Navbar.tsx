"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import type { Category } from "@/lib/types";
import toast from "react-hot-toast";

export default function Navbar({ categories }: { categories: Category[] }) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link href="/" className="min-w-fit">
          <span className="block text-base font-bold tracking-tight text-emerald-800 sm:text-lg">
            🛒 বাজার দর
          </span>
          <span className="mt-0.5 block text-[10px] text-slate-500">{date}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {!isPending && session ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm">👤</span>
                {session.user.name}
                <span aria-hidden="true">⌄</span>
              </button>
              {menuOpen && (
                  <div role="menu" className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="truncate text-xs font-semibold text-slate-800">{session.user.name}</p>
                    <p className="truncate text-[10px] text-slate-500">{session.user.email}</p>
                  </div>
                    <Link
                      href="/profile"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      প্রোফাইল
                    </Link>
                    <button
                      onClick={handleLogout}
                    role="menuitem"
                    className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-700 hover:bg-rose-50"
                    >
                      সাইন আউট
                    </button>
                </div>
              )}
            </div>
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
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1 sm:px-6">
          <Link
            href="/"
            className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition ${
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
                className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition ${
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
