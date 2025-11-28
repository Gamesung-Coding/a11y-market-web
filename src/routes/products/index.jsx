// src/routes/products/index.jsx
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

// TanStack Router – /products 경로
export const Route = createFileRoute('/products/')({
  component: ProductListPage,
});

// 임시 상품 데이터 (백엔드 연동 전 UI 확인용)
const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    title: 'Adaptive Keyboard',
    price: 50000,
    badge: 'Best Seller',
    category: '카테고리1',
    benefit: '세일상품',
    sellerGrade: '우수',
  },
  {
    id: 2,
    name: 'Product 2',
    title: 'Ergonomic Chair',
    price: 120000,
    badge: 'New Arrival',
    category: '카테고리2',
    benefit: '무료배송',
    sellerGrade: '인증',
  },
  {
    id: 3,
    name: 'Product 3',
    title: 'Screen Magnifier',
    price: 30000,
    badge: 'Recommended',
    category: '카테고리3',
    benefit: '그외',
    sellerGrade: '신규',
  },
  {
    id: 4,
    name: 'Product 4',
    title: 'Voice-Controlled Smart Home Device',
    price: 75000,
    badge: 'Top Rated',
    category: '카테고리1',
    benefit: '무료배송',
    sellerGrade: '우수',
  },
];

const CATEGORY_OPTIONS = ['카테고리1', '카테고리2', '카테고리3'];
const BENEFIT_OPTIONS = ['세일상품', '무료배송', '그외'];
const SELLER_GRADE_OPTIONS = ['우수', '인증', '신규'];

const SORT_OPTIONS = [
  { key: 'popular', label: '인기순' },
  { key: 'sales', label: '판매순' },
  { key: 'priceDesc', label: '높은가격순' },
  { key: 'priceAsc', label: '낮은가격순' },
];

function ProductListPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [selectedSellerGrade, setSelectedSellerGrade] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [innerSearchKeyword, setInnerSearchKeyword] = useState('');
  const [sortKey, setSortKey] = useState('popular');

  // 필터링 + 정렬 로직
  const filteredProducts = (() => {
    let list = [...mockProducts];

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (selectedBenefit) {
      list = list.filter((p) => p.benefit === selectedBenefit);
    }
    if (selectedSellerGrade) {
      list = list.filter((p) => p.sellerGrade === selectedSellerGrade);
    }

    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    if (min !== null) {
      list = list.filter((p) => p.price >= min);
    }
    if (max !== null) {
      list = list.filter((p) => p.price <= max);
    }

    const keyword = (searchKeyword || innerSearchKeyword).trim();
    if (keyword) {
      const lower = keyword.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(lower) || p.title.toLowerCase().includes(lower),
      );
    }

    // 정렬 (실제 인기순/판매순은 백엔드 기준에 맞게 고치면 됨)
    if (sortKey === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortKey === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    }
    // popular / sales 는 아직 mock 데이터라 정렬 안 함

    return list;
  })();

  const formatPrice = (value) => value.toLocaleString('ko-KR', { minimumFractionDigits: 0 }) + '원';

  return (
    <main
      className='mx-auto mt-20 max-w-5xl px-4 py-10 text-[#333333]'
      aria-label='상품 목록 페이지'
    >
      {/* 상단 필터 테이블 영역 */}
      <section
        className='mb-10 border border-gray-300 text-xs'
        aria-label='상품 필터 영역'
      >
        {/* 카테고리 */}
        <div className='flex border-b border-gray-300'>
          <div
            className='font-kakao-big flex w-28 items-center border-r border-gray-300 bg-gray-100 px-4 py-3'
            aria-label='카테고리 필터'
          >
            카테고리
          </div>
          <div className='flex flex-1 flex-wrap gap-2 px-4 py-3'>
            {CATEGORY_OPTIONS.map((cat) => (
              <Button
                key={cat}
                type='button'
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size='sm'
                className='font-kakao-big h-7 rounded-none'
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                aria-label={`${cat} 카테고리로 필터링`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* 혜택 */}
        <div className='flex border-b border-gray-300'>
          <div
            className='font-kakao-big flex w-28 items-center border-r border-gray-300 bg-gray-100 px-4 py-3'
            aria-label='혜택 필터'
          >
            혜택
          </div>
          <div className='flex flex-1 flex-wrap gap-2 px-4 py-3'>
            {BENEFIT_OPTIONS.map((b) => (
              <Button
                key={b}
                type='button'
                variant={selectedBenefit === b ? 'default' : 'outline'}
                size='sm'
                className='font-kakao-big h-7 rounded-none'
                onClick={() => setSelectedBenefit(selectedBenefit === b ? null : b)}
                aria-label={`${b} 혜택으로 필터링`}
              >
                {b}
              </Button>
            ))}
          </div>
        </div>

        {/* 판매자 등급 */}
        <div className='flex border-b border-gray-300'>
          <div
            className='font-kakao-big flex w-28 items-center border-r border-gray-300 bg-gray-100 px-4 py-3'
            aria-label='판매자 등급 필터'
          >
            판매자 등급
          </div>
          <div className='flex flex-1 flex-wrap gap-2 px-4 py-3'>
            {SELLER_GRADE_OPTIONS.map((g) => (
              <Button
                key={g}
                type='button'
                variant={selectedSellerGrade === g ? 'default' : 'outline'}
                size='sm'
                className='font-kakao-big h-7 rounded-none'
                onClick={() => setSelectedSellerGrade(selectedSellerGrade === g ? null : g)}
                aria-label={`${g} 등급 판매자로 필터링`}
              >
                {g}
              </Button>
            ))}
          </div>
        </div>

        {/* 가격 */}
        <div className='flex border-b border-gray-300'>
          <div
            className='font-kakao-big flex w-28 items-center border-r border-gray-300 bg-gray-100 px-4 py-3'
            aria-label='가격 필터'
          >
            가격
          </div>
          <div className='flex flex-1 items-center gap-2 px-4 py-3'>
            <input
              type='number'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className='h-8 w-32 border border-gray-300 px-2 text-xs'
              aria-label='최소 가격 입력'
            />
            <span className='mx-1'>~</span>
            <input
              type='number'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='h-8 w-32 border border-gray-300 px-2 text-xs'
              aria-label='최대 가격 입력'
            />
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='ml-2 h-8 w-8'
              aria-label='가격 범위로 검색'
            >
              <Icon
                icon='mdi:magnify'
                className='h-4 w-4'
                aria-hidden='true'
              />
            </Button>
          </div>
        </div>

        {/* 결과 내 재검색 */}
        <div className='flex'>
          <div
            className='font-kakao-big flex w-28 items-center border-r border-gray-300 bg-gray-100 px-4 py-3'
            aria-label='결과 내 재검색 영역'
          >
            결과 내 재검색
          </div>
          <div className='flex flex-1 items-center gap-2 px-4 py-3'>
            <input
              type='text'
              placeholder='검색어를 입력하세요'
              value={innerSearchKeyword}
              onChange={(e) => setInnerSearchKeyword(e.target.value)}
              className='h-8 w-72 border border-gray-300 px-2 text-xs'
              aria-label='결과 내 재검색어 입력'
            />
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='h-8 w-8'
              aria-label='결과 내 재검색 실행'
            >
              <Icon
                icon='mdi:magnify'
                className='h-4 w-4'
                aria-hidden='true'
              />
            </Button>
          </div>
        </div>
      </section>

      {/* 총 n개 + 정렬 옵션 */}
      <section
        className='mb-4 text-xs'
        aria-label='상품 개수 및 정렬 옵션'
      >
        <div className='flex items-center justify-between'>
          <div className='font-kakao-big'>총 {filteredProducts.length}개</div>
          <div className='flex gap-2'>
            {SORT_OPTIONS.map((opt) => (
              <Button
                key={opt.key}
                type='button'
                variant={sortKey === opt.key ? 'default' : 'ghost'}
                size='sm'
                className={
                  sortKey === opt.key
                    ? 'font-kakao-big h-7 rounded-none px-3'
                    : 'font-kakao-big h-7 rounded-none px-3 text-gray-500'
                }
                onClick={() => setSortKey(opt.key)}
                aria-label={`${opt.label}으로 정렬`}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
        <div className='mt-2 border-t border-gray-300' />
      </section>

      {/* 상품 카드 그리드 */}
      <section
        className='mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'
        aria-label='상품 카드 목록'
      >
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className='overflow-hidden rounded-lg border border-gray-200 bg-[#f9f9f9] text-xs'
            aria-label={`${product.title} 상품 카드`}
          >
            {/* 상단 뱃지 */}
            <div className='px-3 pt-3'>
              <span className='font-kakao-big inline-block rounded bg-black px-2 py-0.5 text-[10px] text-white'>
                {product.badge}
              </span>
            </div>

            {/* 이미지 자리 */}
            <div
              className='mx-3 mt-2 h-28 bg-gray-200'
              role='img'
              aria-label={`${product.title} 상품 이미지 자리`}
            />

            {/* 상품 정보 */}
            <div className='space-y-1 px-3 py-3'>
              <p className='text-[11px] text-gray-500'>{product.name}</p>
              <p className='font-kakao-big line-clamp-2 text-sm font-medium'>{product.title}</p>
              <p className='font-kakao-big mt-1 text-sm font-semibold'>
                {formatPrice(product.price)}
              </p>
            </div>

            {/* 장바구니 버튼 */}
            <div className='px-3 pb-3'>
              <Button
                type='button'
                variant='outline'
                className='font-kakao-big w-full justify-center text-xs'
                aria-label={`${product.title} 상품을 장바구니에 담기`}
              >
                <Icon
                  icon='mdi:cart-outline'
                  className='mr-1 h-4 w-4'
                  aria-hidden='true'
                />
                장바구니 담기
              </Button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
