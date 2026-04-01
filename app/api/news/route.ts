import { NextRequest, NextResponse } from 'next/server';
import { fetchNewsByCategory } from '@/lib/newsapi';
import { CategoryId } from '@/types/news';
import { isValidCategory } from '@/lib/categories';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = Number(searchParams.get('page') ?? '1');

  if (!category || !isValidCategory(category)) {
    return NextResponse.json(
      { error: '유효하지 않은 카테고리입니다.' },
      { status: 400 }
    );
  }

  try {
    const articles = await fetchNewsByCategory({
      category: category as CategoryId,
      page,
      pageSize: 20,
    });
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('[API/news]', error);
    return NextResponse.json(
      { error: '뉴스를 불러오는 데 실패했습니다.' },
      { status: 500 }
    );
  }
}
