export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="h-56 animate-pulse rounded-2xl bg-slate-200" />
      ))}
    </div>
  );
}
