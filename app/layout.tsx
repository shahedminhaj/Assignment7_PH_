import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { categories } from "@/lib/categories";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর — প্রতিদিনের বাজার মূল্য",
  description: "বাংলাদেশের প্রতিদিনের বাজার মূল্য দেখুন ও তুলনা করুন।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar categories={categories} />
        <PriceTicker />
        <main className="mx-auto min-h-[calc(100vh-230px)] max-w-6xl px-4 py-6 sm:px-6">{children}</main>
        <footer className="border-t border-emerald-100 bg-white/80">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between">
            <p className="font-semibold text-slate-800">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
          </div>
        </footer>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}