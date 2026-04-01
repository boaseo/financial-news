import { NewsArticle } from '@/types/news';
import { CATEGORY_MAP } from '@/lib/categories';
import { formatRelativeTime } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  showCategory?: boolean;
}

export default function NewsCard({ article, showCategory = true }: NewsCardProps) {
  const cat = CATEGORY_MAP[article.category];
  const timeAgo = formatRelativeTime(article.publishedAt);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-1.5 px-4 py-3.5 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all duration-150"
    >
      <div className="flex items-center gap-2">
        {showCategory && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.color}`}>
            {cat.icon} {cat.label}
          </span>
        )}
        <time className="text-xs text-gray-400 ml-auto flex-shrink-0" dateTime={article.publishedAt}>
          {timeAgo}
        </time>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
        {article.title}
      </h3>
      {article.description && (
        <p className="text-xs text-gray-500 leading-relaxed">{article.description}</p>
      )}
      <span className="text-xs text-gray-400">{article.source}</span>
    </a>
  );
}
