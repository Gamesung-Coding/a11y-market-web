import { mainApi } from '@/api/main-api';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { useNavigate } from '@tanstack/react-router';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProductCard } from './product-card';

export function PopularRanking() {
  const navigate = useNavigate();

  const [carouselApi, setCarouselApi] = useState();
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch popular items from the API
    const fetchPopularItems = async () => {
      try {
        const resp = await mainApi.getPopularItems();
        setData(resp.data);
      } catch (error) {
        console.error('Failed to fetch popular items:', error);
        setError('인기 상품을 불러오는 데 실패했습니다.');
      }
    };

    fetchPopularItems();
  }, []);

  const apiButtonStyles =
    'absolute top-1/2 size-12 -translate-y-1/2 rounded-full bg-neutral-50 text-neutral-700 shadow-lg';

  return (
    <section className='flex h-fit w-full flex-col items-center justify-center'>
      <div className='w-full max-w-7xl py-8 text-center'>
        <header className='mx-auto mb-8 flex w-[80%] items-center gap-3'>
          <TrendingUp
            className='size-8 text-red-500'
            aria-hidden='true'
          />
          <h2
            id='popular-products-title'
            className='text-3xl'
          >
            인기 상품
          </h2>
        </header>
        <div className='relative mx-auto flex w-[80%] flex-col items-center justify-center px-0 pb-8'>
          <Carousel
            opts={{
              align: 'center',
              loop: false,
            }}
            className='w-full'
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {data?.map((product, _) => (
                <CarouselItem
                  key={product.productId}
                  className='basis md:basis-1/2 lg:basis-1/4'
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Button
            variant='outline'
            size='icon'
            className={cn(apiButtonStyles, '-left-8 md:-left-16')}
            onClick={() => carouselApi?.scrollPrev()}
            aria-label='이전 상품 보기'
          >
            <Icon
              icon='mdi:chevron-left'
              className='size-8'
            />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className={cn(apiButtonStyles, '-right-8 md:-right-16')}
            onClick={() => carouselApi?.scrollNext()}
            aria-label='다음 상품 보기'
          >
            <Icon
              icon='mdi:chevron-right'
              className='size-8'
            />
          </Button>
        </div>
        <Button
          variant='default'
          className='mx-auto mt-4 w-3xs px-8 hover:opacity-80'
          onClick={() => {
            navigate({
              to: '/products',
              search: (old) => ({ ...old, sort: 'popular' }),
            });
          }}
        >
          전체 인기 상품 보기
        </Button>
      </div>
    </section>
  );
}
