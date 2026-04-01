import Image from 'next/image';
import { NewsArticle } from '@/types/news';
import { CATEGORY_MAP } from '@/lib/categories';
import { formatRelativeTime } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const cat = CATEGORY_MAP[article.category];
  const timeAgo = formatRelativeTime(article.publishedAt);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200"
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-video bg-gray-100 flex-shrink-0">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className={`flex items-center justify-center h-full ${cat.bgColor}`}>
            <span className="text-5xl">{cat.icon}</span>
          </div>
        )}
        {/* 카테고리 배지 */}
        <span
          className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${cat.bgColor} ${cat.color}`}
        >
          {cat.label}
        </span>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{article.description}</p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
          <span className="font-medium truncate max-w-[60%]">{article.source}</span>
          <time dateTime={article.publishedAt}>{timeAgo}</time>
        </div>
      </div>
    </a>
  );
}
