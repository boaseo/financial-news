export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchNewsByCategory } from '@/lib/newsapi';
import { CATEGORY_MAP, isValidCategory } from '@/lib/categories';
import { CategoryId } from '@/types/news';
import NewsGrid from '@/components/news/NewsGrid';
import { NewsGridSkeleton } from '@/components/news/NewsCardSkeleton';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORY_MAP[category];
  if (!cat) return {};
  return {
    title: `${cat.label} 뉴스 | 파이낸셜 허브`,
    description: `${cat.label} 관련 최신 금융 뉴스를 확인하세요.`,
  };
}

async function CategoryNews({ category }: { category: CategoryId }) {
  const articles = await fetchNewsByCategory({ category, pageSize: 100 });
  return <NewsGrid articles={articles} emptyMessage={`${CATEGORY_MAP[category].label} 뉴스를 불러오지 못했습니다.`} />;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const cat = CATEGORY_MAP[category];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{cat.icon}</span>
        <div>
          <h1 className={`text-2xl font-bold ${cat.color}`}>{cat.label}</h1>
          <p className="text-sm text-gray-500">최신 뉴스</p>
        </div>
      </div>
      <Suspense fallback={<NewsGridSkeleton count={9} />}>
        <CategoryNews category={category as CategoryId} />
      </Suspense>
    </div>
  );
}
