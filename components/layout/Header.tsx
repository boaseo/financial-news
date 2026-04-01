import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <span className="text-xl font-bold text-gray-900">파이낸셜 허브</span>
        </Link>
        <p className="text-sm text-gray-500 hidden sm:block">금융 뉴스 한눈에 보기</p>
      </div>
    </header>
  );
}
