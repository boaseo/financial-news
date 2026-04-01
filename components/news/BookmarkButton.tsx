'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { NewsArticle } from '@/types/news';

interface BookmarkButtonProps {
  article: NewsArticle;
}

export default function BookmarkButton({ article }: BookmarkButtonProps) {
  const { toggle, isBookmarked, hydrated } = useBookmarks();
  const saved = isBookmarked(article.id);

  if (!hydrated) return <div className="w-7 h-7" />;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(article);
      }}
      title={saved ? '북마크 해제' : '북마크 저장'}
      className={`flex-shrink-0 p-1.5 rounded-md transition-colors ${
        saved
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-gray-300 hover:text-gray-500'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>
  );
}
