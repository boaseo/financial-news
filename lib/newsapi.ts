import { NewsArticle, RawNaverNewsItem, CategoryId } from '@/types/news';
import { buildQueryString, CATEGORIES } from './categories';
import { generateArticleId } from './utils';

const NAVER_API_URL = 'https://openapi.naver.com/v1/search/news.json';

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function normalizeArticle(item: RawNaverNewsItem, category: CategoryId): NewsArticle {
  return {
    id: generateArticleId(item.originallink || item.link),
    title: stripHtml(item.title),
    description: stripHtml(item.description) || null,
    url: item.originallink || item.link,
    imageUrl: null, // 네이버 검색 API는 이미지 미제공
    source: new URL(item.originallink || item.link).hostname.replace('www.', ''),
    publishedAt: new Date(item.pubDate).toISOString(),
    category,
  };
}

export interface FetchNewsOptions {
  category: CategoryId;
  pageSize?: number;
  page?: number;
}

export async function fetchNewsByCategory(options: FetchNewsOptions): Promise<NewsArticle[]> {
  const { category, pageSize = 20, page = 1 } = options;

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 환경 변수가 설정되지 않았습니다.');
  }

  const query = buildQueryString(category);
  const params = new URLSearchParams({
    query,
    display: String(Math.min(pageSize, 100)),
    start: String((page - 1) * pageSize + 1),
    sort: 'date',
  });

  const res = await fetch(`${NAVER_API_URL}?${params}`, {
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
    next: { revalidate: 3600, tags: [`news-${category}`] },
  });

  if (!res.ok) {
    throw new Error(`네이버 API 오류 (${res.status}): ${res.statusText}`);
  }

  const data = await res.json();

  return (data.items as RawNaverNewsItem[])
    .filter((item) => item.title && item.link)
    .map((item) => normalizeArticle(item, category));
}

export async function fetchHeadlinesByAllCategories(perCategory = 5): Promise<NewsArticle[]> {
  const results = await Promise.allSettled(
    CATEGORIES.map((cat) =>
      fetchNewsByCategory({ category: cat.id, pageSize: perCategory })
    )
  );

  return results
    .filter((r): r is PromiseFulfilledResult<NewsArticle[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
