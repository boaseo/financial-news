export default function NewsCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 px-4 py-3.5 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-3 w-12 bg-gray-200 rounded animate-pulse ml-auto" />
      </div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
    </div>
  );
}

export function NewsGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}
