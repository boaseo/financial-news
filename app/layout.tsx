import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import CategoryNav from '@/components/layout/CategoryNav';

export const metadata: Metadata = {
  title: 'VIVID FINANCIAL NEWS',
  description: '주식/증시, 암호화폐, 부동산, 거시경제 등 금융 분야 최신 뉴스를 테마별로 확인하세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <Suspense fallback={<div className="h-12 bg-white border-b border-gray-200" />}>
          <CategoryNav />
        </Suspense>
        <main className="container mx-auto px-4 py-6 flex-1">{children}</main>
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-400">
          <p>
            뉴스 제공:{' '}
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              NewsAPI
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
