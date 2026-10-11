import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
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
        <Navbar />
        <PriceTicker />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}