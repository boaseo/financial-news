import { NewsGridSkeleton } from '@/components/news/NewsCardSkeleton';

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-gray-200 animate-pulse" />
        ))}
      </div>
      <NewsGridSkeleton count={12} />
    </div>
  );
}
