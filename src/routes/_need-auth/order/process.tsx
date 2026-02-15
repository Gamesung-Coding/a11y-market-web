import { CART_KEYS } from '@/api/cart/keys';
import { useVerifyPayment } from '@/api/order/mutations';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Icon } from '@iconify/react';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

interface ProcessSearch {
  orderId?: string;
  merchant_uid?: string;
  amount?: number;
  paymentKey?: string;
  imp_uid?: string;
  code?: string;
  message?: string;
}

export const Route = createFileRoute('/_need-auth/order/process')({
  component: RouteComponent,
  validateSearch: (search: Record<string, any>): ProcessSearch => ({
    orderId: search.orderId || search.merchant_uid,
    amount: search.amount ? Number(search.amount) : undefined,
    paymentKey: search.paymentKey,
    imp_uid: search.imp_uid,
    code: search.code,
    message: search.message,
  }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchParams = useSearch({ from: Route.id });
  const processedRef = useRef(false);
  const { mutateAsync: verifyPayment } = useVerifyPayment();

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    (async () => {
      const { orderId, amount, paymentKey, code, message } = searchParams;

      if (code) {
        throw new Error(`결제에 실패하였습니다: ${message} (코드: ${code})`);
      }
      if (!orderId) throw new Error('주문 ID가 없습니다.');

      await verifyPayment({
        orderId,
        amount: Number(amount),
        paymentKey: paymentKey || '',
      });

      sessionStorage.removeItem('checkout_cart_items');

      // Cart count update via React Query invalidation
      await queryClient.invalidateQueries({ queryKey: CART_KEYS.count() });

      navigate({
        to: '/order/complete',
        replace: true,
        search: {
          orderId,
        },
      });
    })();
  }, [searchParams, navigate, queryClient]);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Icon
            icon='svg-spinners:90-ring-with-bg'
            className='size-16'
          />
        </EmptyMedia>
        <EmptyTitle className='text-3xl font-bold'>로딩 중 입니다.</EmptyTitle>
        <EmptyDescription className='text-lg'>잠시만 기다려주세요.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
