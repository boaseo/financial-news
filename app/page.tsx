export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import { Suspense } from 'react';
import { fetchHeadlinesByAllCategories } from '@/lib/newsapi';
import { CATEGORIES } from '@/lib/categories';
import NewsGrid from '@/components/news/NewsGrid';
import { NewsGridSkeleton } from '@/components/news/NewsCardSkeleton';
import Link from 'next/link';

async function AllNews() {
  const articles = await fetchHeadlinesByAllCategories(5);
  return <NewsGrid articles={articles} emptyMessage="뉴스를 불러오지 못했습니다. API 키를 확인하세요." />;
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* 카테고리 빠른 이동 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">카테고리별 보기</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className={`flex items-center gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow ${cat.color}`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="font-medium text-gray-800">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 전체 최신 뉴스 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">최신 금융 뉴스</h2>
        <Suspense fallback={<NewsGridSkeleton count={12} />}>
          <AllNews />
        </Suspense>
      </section>
    </div>
  );
}
