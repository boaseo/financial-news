export type CategoryId = 'stocks' | 'crypto' | 'realestate' | 'macro' | 'ai' | 'data';

export interface Category {
  id: CategoryId;
  label: string;
  keywords: string[];
  color: string;
  bgColor: string;
  icon: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  category: CategoryId;
}

export interface RawNaverNewsItem {
  title: string;
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
}
