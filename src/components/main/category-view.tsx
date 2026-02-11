import { useGetRecommendCategories } from '@/api/main/queries';
import type { Product } from '@/api/product/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconMap } from '@/lib/category-icon-mapping';
import { useNavigate } from '@tanstack/react-router';
import { ProductCard } from './product-card';

export function CategoryView() {
  const navigate = useNavigate();
  const { data: items } = useGetRecommendCategories();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className='flex h-fit w-full flex-col items-center justify-center'
      aria-labelledby='category-product-title'
    >
      <header className='container mx-auto px-4'>
        <h2
          id='category-product-title'
          className='mb-8 text-3xl'
        >
          카테고리별 추천 상품
        </h2>
      </header>
      <div className='container mx-auto px-4'>
        <Tabs
          defaultValue={items[0]?.categoryId}
          className='w-full'
        >
          <TabsList className='mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-full bg-neutral-200 p-1 dark:bg-neutral-600'>
            {items.map((item) => {
              return (
                <TabsTrigger
                  key={item.categoryId}
                  value={item.categoryId}
                  className='gap-2 rounded-full px-4'
                >
                  <IconMap
                    categoryName={item.categoryName}
                    className='size-5'
                  />
                  {item.categoryName}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {items.map((item) => (
            <TabsContent
              key={item.categoryId}
              value={item.categoryId}
            >
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {item.products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product as Product}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Button
        variant='default'
        className='mx-auto mt-4 w-3xs px-8 hover:opacity-80'
        onClick={() => navigate({ to: '/products' })}
      >
        전체 상품 보기
      </Button>
    </section>
  );
}
