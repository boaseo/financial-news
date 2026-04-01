import { NewsArticle } from '@/types/news';
import NewsCard from './NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
  emptyMessage?: string;
}

export default function NewsGrid({
  articles,
  emptyMessage = '뉴스를 불러오지 못했습니다.',
}: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <span className="text-5xl mb-4">📭</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
