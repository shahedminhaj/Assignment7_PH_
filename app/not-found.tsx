import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🧐</p>
      <h1 className="text-2xl font-bold mb-2">৪০৪ — পৃষ্ঠা পাওয়া যায়নি</h1>
      <p className="mb-6 text-slate-600">আপনার খোঁজা পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।</p>
      <Link href="/" className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}