import { adminApi } from '@/api/admin-api';
import { SellerInfoItem } from '@/components/admin/seller-info-item';
import { LoadingEmpty } from '@/components/main/loading-empty';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { createFileRoute } from '@tanstack/react-router';
import { Search, UserRoundSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_need-auth/_admin/admin/sellers/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { status, data } = await adminApi.getSellerList();

        if (status !== 200) {
          throw new Error('판매자 목록을 불러오지 못했습니다.');
        }

        setSellers(data);
      } catch (err) {
        console.error('판매자 목록 조회 실패:', err);
        toast.error('판매자 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingEmpty />;
  }

  return (
    <main className='font-kakao-big mx-auto max-w-6xl px-4 py-8'>
      <section className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>판매자 관리</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            판매자 계정 신청을 검토하고 승인/거절할 수 있습니다.
          </p>
        </div>
      </section>

      <section className='mb-4 flex max-w-6xl items-center justify-center'>
        <div className='relative mb-6 w-full'>
          <Search
            className='absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400'
            aria-hidden='true'
          />
          <Input
            type='search'
            placeholder='판매자명, 이메일로 검색'
            className='pl-10'
          />
        </div>
      </section>

      <section className='border-muted-foreground/20 bg-card mb-8 flex w-full max-w-6xl flex-col gap-4 rounded-2xl border p-4'>
        {sellers.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant='icon'>
                <UserRoundSearch />
              </EmptyMedia>
              <EmptyTitle>현재 승인 대기중인 판매자가 없습니다</EmptyTitle>
              <EmptyDescription>
                아직 승인 대기중인 판매자 신청이 없습니다. 새로운 신청이 들어오면 여기에서 확인할 수
                있습니다.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {sellers.length > 0 && (
          <>
            {sellers.map((seller) => (
              <SellerInfoItem
                key={seller.sellerId}
                seller={seller}
              />
            ))}
          </>
        )}
      </section>
    </main>
  );
}
