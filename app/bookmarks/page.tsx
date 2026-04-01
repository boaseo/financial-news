'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import PaginatedNewsGrid from '@/components/news/PaginatedNewsGrid';

export default function BookmarksPage() {
  const { bookmarks, hydrated } = useBookmarks();

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔖</span>
        <h1 className="text-xl font-bold text-gray-900">저장된 뉴스</h1>
        <span className="text-sm text-gray-400">({bookmarks.length}개)</span>
      </div>
      <PaginatedNewsGrid
        articles={bookmarks}
        emptyMessage="저장된 뉴스가 없습니다. 뉴스 카드의 북마크 버튼을 눌러 저장하세요."
        showCategory={true}
      />
    </div>
  );
}
