'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <span className="text-5xl">⚠️</span>
      <h2 className="text-xl font-semibold text-gray-800">뉴스를 불러오지 못했습니다</h2>
      <p className="text-gray-500 text-sm max-w-md">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
