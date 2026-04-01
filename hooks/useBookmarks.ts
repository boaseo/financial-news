'use client';

import { useState, useEffect, useCallback } from 'react';
import { NewsArticle } from '@/types/news';

const STORAGE_KEY = 'vfn_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const toggle = useCallback((article: NewsArticle) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === article.id);
      const next = exists
        ? prev.filter((b) => b.id !== article.id)
        : [article, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  return { bookmarks, toggle, isBookmarked, hydrated };
}
