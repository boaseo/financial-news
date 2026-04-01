export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import { Suspense } from 'react';
import { fetchHeadlinesByAllCategories } from '@/lib/newsapi';
import NewsGrid from '@/components/news/NewsGrid';
import { NewsGridSkeleton } from '@/components/news/NewsCardSkeleton';

async function AllNews() {
  const articles = await fetchHeadlinesByAllCategories(5);
  return <NewsGrid articles={articles} emptyMessage="뉴스를 불러오지 못했습니다. API 키를 확인하세요." />;
}

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">최신 금융 뉴스</h2>
      <Suspense fallback={<NewsGridSkeleton count={12} />}>
        <AllNews />
      </Suspense>
    </div>
  );
}
