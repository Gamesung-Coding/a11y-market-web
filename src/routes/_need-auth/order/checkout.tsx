import { useGetAddressList } from '@/api/address/queries';
import type { Address } from '@/api/address/types';
import { useCreateOrder, useGetCheckoutInfo } from '@/api/order/mutations';
import type { CheckoutInfoResponse } from '@/api/order/types';
import { useGetProfile } from '@/api/user/queries';
import { AddressSelector } from '@/components/address/address-selector';
import { ErrorEmpty } from '@/components/main/error-empty';
import { LoadingEmpty } from '@/components/main/loading-empty';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { loadPaymentWidget, type PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// Define search params type
interface CheckoutSearch {
  type: 'CART' | 'DIRECT';
  cartItemIds?: string;
  productId?: number;
  quantity?: number;
}

const CLIENT_KEY = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;

export const Route = createFileRoute('/_need-auth/order/checkout')({
  component: OrderCheckoutPage,
  validateSearch: (search: Record<string, any>): CheckoutSearch => ({
    type: search.type || 'CART',
    cartItemIds: search.cartItemIds,
    productId: search.productId ? Number(search.productId) : undefined,
    quantity: search.quantity ? Number(search.quantity) : 1,
  }),
});

function OrderCheckoutPage() {
  const { type, cartItemIds, productId, quantity } = Route.useSearch();

  const [checkout, setCheckout] = useState<CheckoutInfoResponse | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  const navigate = useNavigate();
  const { mutateAsync: getCheckoutInfo, isPending: loading, error } = useGetCheckoutInfo();
  const { mutateAsync: createOrder } = useCreateOrder();
  const { data: addresses } = useGetAddressList();
  const { data: user } = useGetProfile();

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodWidgetRef = useRef<any>(null);

  // 결제 전 정보 조회
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;
    (async () => {
      if (!addresses || !user) return;

      const cartIds = cartItemIds ? cartItemIds.split(',').map(Number) : [];

      // Direct order item
      const directItem =
        type === 'DIRECT' && productId ? { productId, quantity: quantity || 1 } : undefined;

      const data = await getCheckoutInfo({
        cartItemIds: type === 'CART' ? cartIds : [],
        directOrderItem: directItem,
      });

      if (!isMounted) return;

      setCheckout(data);
      setOrderItems((data as any).items || []);

      const defaultAddress =
        addresses.find((addr) => addr.isDefault === true) || addresses[0] || null;
      setSelectedAddress(defaultAddress);

      const userId = String(user.userId);
      if (!userId) throw new Error('사용자 정보가 없습니다.');

      const paymentWidget = await loadPaymentWidget(CLIENT_KEY, userId);
      paymentWidgetRef.current = paymentWidget;

      const paymentMethodWidget = paymentWidget.renderPaymentMethods(
        '#payment-method',
        { value: data.finalAmount },
        { variantKey: 'DEFAULT' },
      );

      paymentWidget.renderAgreement('#agreement', { variantKey: 'DEFAULT' });
      paymentMethodWidgetRef.current = paymentMethodWidget;
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePayment = async () => {
    if (!user) {
      toast.error('사용자 정보가 없습니다.');
      return;
    }

    if (!selectedAddress) {
      toast.error('배송지를 선택해주세요.');
      return;
    }
    const currentCartItemIds = orderItems.map((item: any) => item.cartItemId);

    const orderData = await createOrder({
      addressId: selectedAddress.addressId,
      cartItemIds: type === 'CART' ? currentCartItemIds : null,
      directOrderItem:
        type === 'DIRECT' && orderItems.length > 0
          ? { productId: orderItems[0].productId, quantity: orderItems[0].quantity }
          : null,
    });

    if (!orderData || !orderData.orderId) {
      throw new Error('주문 생성에 실패했습니다.');
    }

    if (type === 'CART') {
      sessionStorage.setItem('checkout_cart_items', JSON.stringify(currentCartItemIds));
    }

    const paymentWidget = paymentWidgetRef.current;
    if (!paymentWidget) throw new Error('결제 위젯이 로드되지 않았습니다.');

    await paymentWidget.requestPayment({
      orderId: orderData.orderId,
      orderName:
        orderItems.length > 1
          ? `${orderItems[0].productName} 외 ${orderItems.length - 1}건`
          : orderItems[0].productName,
      successUrl: `${window.location.origin}/order/process`,
      failUrl: `${window.location.origin}/order/process`,
      customerEmail: user.userEmail,
      customerName: user.userName,
    });
  };

  // 로딩 상태
  if (loading && !checkout) {
    return (
      <main
        className='font-kakao-big flex min-h-screen items-center justify-center'
        role='status'
        aria-live='polite'
      >
        <LoadingEmpty />
      </main>
    );
  } else if (error || (!loading && !checkout)) {
    return (
      <main className='font-kakao-big flex items-center justify-center py-24'>
        <ErrorEmpty
          prevPath='/cart'
          message={
            error?.message ||
            '결제 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          }
        />
      </main>
    );
  } else {
    // checkout is not null here
    const checkoutData = checkout!;

    return (
      <main className='font-kakao-big mx-auto flex max-w-4xl flex-col justify-center space-y-6 p-6'>
        <header className='flex flex-col justify-center gap-4 py-4'>
          <h1 className='text-center text-2xl font-bold'>주문결제</h1>
          <Breadcrumb className='flex justify-center'>
            <BreadcrumbList>
              <BreadcrumbItem className='text-muted-foreground'>
                <Link
                  to='/cart'
                  className='hover:underline'
                >
                  01 장바구니
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className='text-foreground'>02 주문결제</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className='text-muted-foreground'>03 주문완료</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <Separator className='' />
        {/* 배송지 선택 */}
        <section>
          <AddressSelector
            defaultAddressId={selectedAddress?.addressId ?? ''}
            onSelectAddress={(address) => {
              setSelectedAddress(address);
            }}
          />
        </section>

        {/* 주문 상품 정보 */}
        <section>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>주문 상품 정보</CardTitle>
              <CardDescription>주문하실 상품을 확인해 주세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className='px-8'>
                  <TableRow>
                    <TableHead className='w-2/5 text-center'>상품명</TableHead>
                    <TableHead className='w-1/5 text-center'>수량</TableHead>
                    <TableHead className='w-1/5 text-center'>가격</TableHead>
                    <TableHead className='w-1/5 text-center'>합계</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='px-8'>
                  {orderItems.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell className='max-w-40 truncate px-8'>
                        {`${item.productName}`}
                      </TableCell>
                      <TableCell className='text-center'>{item.quantity}</TableCell>
                      <TableCell className='text-center'>{`${item.productPrice?.toLocaleString('ko-KR')}원`}</TableCell>
                      <TableCell className='text-center'>{`${(item.productPrice * item.quantity)?.toLocaleString('ko-KR')}원`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* 금액 정보 */}
        <section>
          <Card className='h-full w-full gap-2'>
            <CardHeader>
              <CardTitle className='font-bold'>결제 수단</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <Card className='py-0 transition-colors has-data-[state=checked]:border-l-4 has-data-[state=checked]:border-blue-500'>
                <CardContent className='flex items-center gap-4 p-0'>
                  <div
                    id='payment-method'
                    className='flex-1 overflow-hidden rounded-lg'
                  />
                </CardContent>
              </Card>
              <Card className='py-0 transition-colors has-data-[state=checked]:border-l-4 has-data-[state=checked]:border-blue-500'>
                <CardContent className='flex items-center gap-4 p-0'>
                  <div
                    id='agreement'
                    className='flex-1 overflow-hidden rounded-lg'
                  />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        <section className='flex flex-col gap-4'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>결제 금액 정보</CardTitle>
              <CardDescription>결제하실 금액을 확인해 주세요.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
              <span>{`총 상품 금액: ${checkoutData.totalAmount.toLocaleString('ko-KR')}원`}</span>
              <span>{`배송비: ${checkoutData.shippingFee.toLocaleString('ko-KR')}원`}</span>
              <span className='text-lg font-bold'>
                {`총 결제 금액: ${checkoutData.finalAmount.toLocaleString('ko-KR')}원`}
              </span>
            </CardContent>
          </Card>

          {/* 주문 버튼 */}
          <div className='flex h-fit w-full flex-col gap-2'>
            <Button
              variant='default'
              className='w-full py-6 text-lg'
              onClick={handlePayment}
              disabled={loading}
              aria-label='결제하기 버튼'
            >
              {loading ? '결제 처리중...' : '결제하기'}
            </Button>
            <Button
              variant='outline'
              className='w-full py-6 text-lg'
              onClick={() => navigate({ to: '/cart' })}
              disabled={loading}
              aria-label='장바구니로 돌아가기 버튼'
            >
              장바구니로 돌아가기
            </Button>
          </div>
        </section>
      </main>
    );
  }
}
