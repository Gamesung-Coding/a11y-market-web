import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getCheckoutInfo, createOrder } from '@/api/orderAPI';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/order/checkout')({
  component: orderCheckoutPage,
});

function orderCheckoutPage() {
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //임시 : cart에서 받아올 값
  const orderItemIds = [
    '019A6A12-7F22-7FEC-9029-BDBB9F4AA720',
    '019A6A12-7F22-7FEC-9029-BDBB9F4AA721',
  ];
  const addressId = '019A698D-82C0-7C66-AC4A-293C84ACFA52';

  // 결제 전 정보 조회
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        setLoading(true);
        const data = await getCheckoutInfo(orderItemIds);
        setCheckout(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();
  }, []);

  const handleOrder = async () => {
    try {
      setLoading(true);

      const order = await createOrder(addressId, orderItemIds);

      window.location.href = `/order/complete?orderId=${order.orderId}`;
    } catch (error) {
      alert('주문 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  //에러 발생 시
  if (error) {
    return (
      <div
        className='flex min-h-screen items-center justify-center text-red-600'
        role='alert'
        aria-live='assertive'
      >
        결제 정보를 불러올 수 없습니다.
      </div>
    );
  }

  // 로딩 상태
  if (!checkout) {
    return (
      <div
        className='flex min-h-screen items-center justify-center'
        role='status'
        aria-live='polite'
      >
        로딩중...
      </div>
    );
  }

  return (
    <main className='mx-auto max-w-3xl space-y-6 p-6'>
      <h1 className='text-xl font-bold'>결제 페이지</h1>

      {/* 금액 정보 */}
      <section
        className='space-y-2 rounded-lg border p-4'
        aria-label='결제 금액 정보'
      >
        <p>총 상품 금액: {checkout.totalAmount}원</p>
        <p>배송비: {checkout.shippingFee}원</p>
        <p className='text-lg font-bold'>총 결제 금액: {checkout.finalAmount}원</p>
      </section>

      {/* 주문 버튼 */}
      <Button
        variant='default'
        className='w-full py-6 text-lg'
        onClick={handleOrder}
        disabled={loading}
        aria-label='주문 실행 버튼'
      >
        {loading ? '주문 처리중...' : '주문하기'}
      </Button>
    </main>
  );
}
