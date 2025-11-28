import { CategoryView } from '@/components/main/category-view';
import { MainCarousel } from '@/components/main/main-carousel';
import { RealtimeRanking } from '@/components/main/realtime-ranking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const bannerData = [
    { id: 1, title: '혜택 배너 1', description: '첫 번째 혜택 배너 설명' },
    { id: 2, title: '혜택 배너 2', description: '두 번째 혜택 배너 설명' },
    { id: 3, title: '혜택 배너 3', description: '세 번째 혜택 배너 설명' },
    { id: 4, title: '혜택 배너 4', description: '네 번째 혜택 배너 설명' },
    { id: 5, title: '혜택 배너 5', description: '다섯 번째 혜택 배너 설명' },
  ];

  const realtimeRankingData = [
    { id: 1, title: '인기 상품 1', price: 10000 },
    { id: 2, title: '인기 상품 2', price: 20000 },
    { id: 3, title: '인기 상품 3', price: 30000 },
    { id: 4, title: '인기 상품 4', price: 40000 },
    { id: 5, title: '인기 상품 5', price: 50000 },
    { id: 6, title: '인기 상품 6', price: 60000 },
    { id: 7, title: '인기 상품 7', price: 70000 },
    { id: 8, title: '인기 상품 8', price: 80000 },
    { id: 9, title: '인기 상품 9', price: 90000 },
    { id: 10, title: '인기 상품 10', price: 100000 },
  ];

  const categoriesDummyData = [
    { id: 1, name: '카테고리 1' },
    { id: 2, name: '카테고리 2' },
    { id: 3, name: '카테고리 3' },
    { id: 4, name: '카테고리 4' },
    { id: 5, name: '카테고리 5' },
  ];

  const productsDummyData = [
    { id: 1, title: '상품 1', price: 10000, categoryId: 1 },
    { id: 2, title: '상품 2', price: 20000, categoryId: 1 },
    { id: 3, title: '상품 3', price: 30000, categoryId: 2 },
    { id: 4, title: '상품 4', price: 40000, categoryId: 2 },
    { id: 5, title: '상품 5', price: 50000, categoryId: 3 },
    { id: 6, title: '상품 6', price: 60000, categoryId: 1 },
    { id: 7, title: '상품 7', price: 70000, categoryId: 4 },
    { id: 8, title: '상품 8', price: 80000, categoryId: 4 },
    { id: 9, title: '상품 9', price: 90000, categoryId: 1 },
    { id: 10, title: '상품 10', price: 100000, categoryId: 5 },
    { id: 11, title: '상품 11', price: 110000, categoryId: 1 },
    { id: 12, title: '상품 12', price: 120000, categoryId: 2 },
    { id: 13, title: '상품 13', price: 130000, categoryId: 4 },
    { id: 14, title: '상품 14', price: 140000, categoryId: 4 },
    { id: 15, title: '상품 15', price: 150000, categoryId: 5 },
    { id: 16, title: '상품 16', price: 160000, categoryId: 1 },
    { id: 17, title: '상품 17', price: 170000, categoryId: 2 },
    { id: 18, title: '상품 18', price: 180000, categoryId: 3 },
    { id: 19, title: '상품 19', price: 190000, categoryId: 4 },
    { id: 20, title: '상품 20', price: 200000, categoryId: 5 },
  ];

  const [productList, setProductList] = useState(productsDummyData.slice(0, 12));

  const handleSelectCategory = (categoryId) => {
    const filteredProducts = productsDummyData.filter(
      (product) => product.categoryId === categoryId,
    );
    setProductList(filteredProducts);
  };

  return (
    <main className='font-kakao-big flex min-h-screen w-full flex-col items-center'>
      <section className='flex h-fit w-full items-center justify-center bg-amber-50 px-4 pb-8 lg:py-8 dark:bg-stone-700'>
        <MainCarousel data={bannerData} />
      </section>
      <section className='flex h-fit w-full flex-col items-center justify-center'>
        <RealtimeRanking data={realtimeRankingData} />
      </section>
      <section className='flex h-fit w-full flex-col items-center justify-center'>
        <CategoryView
          categories={categoriesDummyData}
          products={productList}
          onSelectCategory={handleSelectCategory}
        />
      </section>
      <section className='mt-16 flex w-full flex-col items-center justify-center bg-neutral-100 px-64 dark:bg-neutral-700'>
        <div className='flex w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center'>
          <h2 className='w-full text-4xl font-bold'>왜 A11yMARKET 일까요?</h2>
          <p className='mt-4 w-full text-xl'>
            우리 플랫폼은 누구나 쉽게 쇼핑할 수 있는 환경을 만드는 데 집중하고 있습니다.
          </p>
        </div>
        <div className='grid w-full grid-cols-2 gap-8 px-4 pb-16'>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:accessibility'
                className='size-12 text-blue-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>누구나 사용할 수 있는 디자인</CardTitle>
              <CardDescription>
                우리 서비스는 다양한 제약을 가진 사용자들도 쉽게 접근하고 이용할 수 있도록
                설계되었습니다.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:search'
                className='size-12 text-green-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>접근성 중심의 상품 탐색</CardTitle>
              <CardDescription>
                나의 요구에 맞는 상품을 빠르고 정확하게 찾을 수 있도록 도와드립니다.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:customer-service'
                className='size-12 text-yellow-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>신뢰할 수 있는 고객 지원</CardTitle>
              <CardDescription>
                필요한 순간 언제든 도움을 드릴 준비가 되어 있습니다.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='flex flex-row items-center gap-0 px-8 py-4'>
            <CardContent className='items-center justify-center'>
              <Icon
                icon='mdi:arrow-up-bold-hexagon-outline'
                className='size-12 text-purple-500'
              />
            </CardContent>
            <CardHeader className='flex-1'>
              <CardTitle>사용자 의견을 반영한 서비스 개선</CardTitle>
              <CardDescription>
                여러분의 목소리는 서비스 발전의 가장 중요한 기준입니다.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </main>
  );
}
