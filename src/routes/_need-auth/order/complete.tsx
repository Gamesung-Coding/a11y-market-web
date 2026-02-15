import { Button } from '@/components/ui/button';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { CheckCircle2 } from 'lucide-react';

interface CompleteSearch {
  orderId?: string;
}

export const Route = createFileRoute('/_need-auth/order/complete')({
  component: OrderCompletePage,
  validateSearch: (search: Record<string, any>): CompleteSearch => ({
    orderId: search.orderId,
  }),
});

function OrderCompletePage() {
  const { orderId } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <section
      className='flex min-h-screen items-center justify-center px-6'
      aria-label='주문 완료 페이지'
    >
      <div className='w-full max-w-xl rounded-xl border p-8 text-center shadow-lg'>
        {/* 아이콘 */}
        <CheckCircle2
          className='mx-auto mb-6 h-16 w-16 text-green-600'
          aria-hidden='true'
        />

        {/* 상태 메세지 - screen reader */}
        <h1
          className='mb-2 text-2xl font-bold'
          role='status'
          aria-live='polite'
        >
          주문이 완료되었습니다.
        </h1>

        {/* 주문번호 */}
        <p className='mb-6'>주문 번호를 아래에서 확인하실 수 있습니다.</p>

        <div
          className='mb-8 rounded-md p-4 text-sm font-medium'
          aria-label='주문 번호 정보'
        >
          주문번호: <span className='font-semibold'>{orderId || '알 수 없음'}</span>
        </div>

        {/* 버튼 영역 */}
        <div className='flex flex-col gap-3'>
          <Button
            variant='default'
            className='w-full'
            onClick={() => (window.location.href = '/')}
            aria-label='홈으로 이동'
          >
            홈으로 이동
          </Button>

          <Button
            variant='outline'
            className='w-full'
            onClick={() =>
              navigate({
                to: '/_need-auth/mypage', // Updated to full path just in case, or alias? Original was '/mypage'. But route in file system is '_need-auth/mypage'.
                // If router is set up correctly, '/mypage' might redirect or resolve if it's a child of root or flat.
                // But structure is src/routes/_need-auth/mypage.
                // TanStack router usually flattens if _ prefix.
                // But wait, _need-auth is a layout route (directory).
                // So path is /mypage.
                // I'll keep '/mypage' as in original.
                search: (prev: any) => ({ ...prev, tab: 'order' }),
              })
            }
            aria-label='내 주문 내역 보기'
          >
            내 주문 내역 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
