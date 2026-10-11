import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🧐</p>
      <h1 className="text-2xl font-bold mb-2">৪০৪ — পৃষ্ঠা পাওয়া যায়নি</h1>
      <Link href="/" className="text-brand-600 font-medium">হোমে ফিরে যান</Link>
    </div>
  );
}