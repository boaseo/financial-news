'use client';

import { useState } from 'react';
import { NewsArticle } from '@/types/news';
import NewsGrid from './NewsGrid';
import Pagination from '@/components/ui/Pagination';

const PAGE_SIZE = 18;

interface PaginatedNewsGridProps {
  articles: NewsArticle[];
  emptyMessage?: string;
  showCategory?: boolean;
}

export default function PaginatedNewsGrid({
  articles,
  emptyMessage,
  showCategory = true,
}: PaginatedNewsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageArticles = articles.slice(start, start + PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <NewsGrid
        articles={pageArticles}
        emptyMessage={emptyMessage}
        showCategory={showCategory}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
