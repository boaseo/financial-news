import { Category, CategoryId } from '@/types/news';

export const CATEGORIES: Category[] = [
  {
    id: 'macro',
    label: '거시경제/정책',
    keywords: ['금리', '기준금리', 'GDP', '인플레이션', '한국은행', '경제정책', 'Fed'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: '🏦',
  },
  {
    id: 'stocks',
    label: '주식/증시',
    keywords: ['코스피', '코스닥', '주식시장', 'KOSPI', 'stock market', '삼성전자', '한국증시'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: '📈',
  },
  {
    id: 'crypto',
    label: '암호화폐',
    keywords: ['비트코인', '이더리움', '암호화폐', '가상화폐', 'Bitcoin', 'cryptocurrency', '업비트'],
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    icon: '₿',
  },
  {
    id: 'realestate',
    label: '부동산',
    keywords: ['부동산', '아파트', '분양', '전세', '주택시장', '재건축', '집값'],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    icon: '🏠',
  },
  {
    id: 'ai',
    label: 'AI',
    keywords: ['인공지능', 'AI', 'ChatGPT', '생성형AI', 'LLM', '머신러닝', 'OpenAI'],
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    icon: '🤖',
  },
  {
    id: 'data',
    label: '데이터',
    keywords: ['빅데이터', '데이터센터', '클라우드', 'AWS', '반도체', '데이터산업', 'cloud computing'],
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    icon: '🗄️',
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export function buildQueryString(categoryId: string): string {
  const category = CATEGORY_MAP[categoryId];
  if (!category) throw new Error(`Unknown category: ${categoryId}`);
  return category.keywords.slice(0, 5).join(' OR ');
}

export function isValidCategory(id: string): id is CategoryId {
  return id in CATEGORY_MAP;
}
