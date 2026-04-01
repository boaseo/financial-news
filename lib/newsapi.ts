import { NewsArticle, RawNaverNewsItem, CategoryId } from '@/types/news';
import { CATEGORIES, CATEGORY_MAP } from './categories';
import { generateArticleId } from './utils';

const NAVER_API_URL = 'https://openapi.naver.com/v1/search/news.json';

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function getSource(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function parseDate(pubDate: string): Date | null {
  const d = new Date(pubDate);
  return isNaN(d.getTime()) ? null : d;
}

function normalizeArticle(item: RawNaverNewsItem, category: CategoryId): NewsArticle | null {
  const url = item.originallink || item.link;
  const date = parseDate(item.pubDate);
  if (!date) return null;
  return {
    id: generateArticleId(url),
    title: stripHtml(item.title),
    description: stripHtml(item.description) || null,
    url,
    imageUrl: null,
    source: getSource(url),
    publishedAt: date.toISOString(),
    category,
  };
}

export interface FetchNewsOptions {
  category: CategoryId;
  pageSize?: number;
  page?: number;
}

// 카테고리별 키워드를 순환하며 여러 번 요청해 결과를 합산
export async function fetchNewsByCategory(options: FetchNewsOptions): Promise<NewsArticle[]> {
  const { category, pageSize = 20, page = 1 } = options;

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 환경 변수가 설정되지 않았습니다.');
  }

  const keywords = CATEGORY_MAP[category].keywords;
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;

  // 키워드를 3개씩 묶어 요청 (네이버 API는 단일 키워드가 가장 안정적)
  const groups = [keywords.slice(0, 5), keywords.slice(5, 10), keywords.slice(10, 15)];

  const results = await Promise.allSettled(
    groups.map(async (group) => {
      const query = group.join(' ');
      const params = new URLSearchParams({
        query,
        display: String(Math.min(Math.ceil(pageSize / groups.length), 100)),
        start: String((page - 1) * Math.ceil(pageSize / groups.length) + 1),
        sort: 'date',
      });

      const res = await fetch(`${NAVER_API_URL}?${params}`, {
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
        next: { revalidate: 3600, tags: [`news-${category}`] },
      });

      if (!res.ok) return [];
      const data = await res.json();
      return (data.items as RawNaverNewsItem[]) ?? [];
    })
  );

  const allItems = results
    .filter((r): r is PromiseFulfilledResult<RawNaverNewsItem[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  // 중복 URL 제거 후 날짜 필터 + 정렬
  const seen = new Set<string>();
  return allItems
    .filter((item) => {
      if (!item.title || !item.link) return false;
      const url = item.originallink || item.link;
      if (seen.has(url)) return false;
      seen.add(url);
      const date = parseDate(item.pubDate);
      return date !== null && date.getTime() >= cutoff;
    })
    .map((item) => normalizeArticle(item, category))
    .filter((a): a is NewsArticle => a !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, pageSize);
}

export async function fetchHeadlinesByAllCategories(perCategory = 15): Promise<NewsArticle[]> {
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
