import { Category, CategoryId } from '@/types/news';

export const CATEGORIES: Category[] = [
  {
    id: 'macro',
    label: '거시경제/정책',
    keywords: [
      '기준금리', '금리인상', '금리인하', '인플레이션', '물가상승',
      '한국은행', '미연준', '경제성장률', '무역수지', '환율',
      '재정정책', '통화정책', '경상수지', '소비자물가', '국가부채',
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: '🏦',
  },
  {
    id: 'stocks',
    label: '주식/증시',
    keywords: [
      '코스피', '코스닥', '증시', '주가', '주식시장',
      '삼성전자', 'SK하이닉스', '현대차', '카카오', '네이버',
      '외국인매수', '기관투자', '공매도', '상장폐지', '주식배당',
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: '📈',
  },
  {
    id: 'crypto',
    label: '암호화폐',
    keywords: [
      '비트코인', '이더리움', '암호화폐', '가상자산', '코인시장',
      '업비트', '빗썸', '가상화폐거래소', '디지털자산', '알트코인',
      '코인투자', '블록체인', '스테이블코인', '가상자산과세', '코인규제',
    ],
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    icon: '₿',
  },
  {
    id: 'realestate',
    label: '부동산',
    keywords: [
      '아파트', '부동산', '집값', '전세', '월세',
      '청약', '분양', '재건축', '재개발', '주택담보대출',
      '부동산정책', '임대차', '역전세', '갭투자', '공시가격',
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    icon: '🏠',
  },
  {
    id: 'ai',
    label: 'AI',
    keywords: [
      '인공지능', '생성형AI', '챗GPT', '거대언어모델', 'AI반도체',
      '딥러닝', '머신러닝', 'AI서비스', 'AI규제', 'AI투자',
      '자율주행', 'AI에이전트', '클로드', '제미나이', 'AI스타트업',
    ],
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    icon: '🤖',
  },
  {
    id: 'data',
    label: '데이터',
    keywords: [
      '데이터센터', '반도체', '클라우드', '빅데이터', '데이터산업',
      '데이터주권', '개인정보', '사이버보안', '데이터경제', '엔비디아',
      '서버증설', '데이터거버넌스', '디지털전환', '망중립성', '데이터댐',
    ],
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
  // 네이버 검색 API OR 연산자: |
  return category.keywords.slice(0, 8).join('|');
}

export function isValidCategory(id: string): id is CategoryId {
  return id in CATEGORY_MAP;
}
