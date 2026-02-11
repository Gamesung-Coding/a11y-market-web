import { useGetMyOrders } from '@/api/order/queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { useNavigate } from '@tanstack/react-router';
import { LoadingEmpty } from '../main/loading-empty';
import OrderCard from '../order/order-card';
import { Button } from '../ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty';

export const OrderHistory = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useGetMyOrders();

  if (isLoading) {
    return <LoadingEmpty />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-2xl font-bold'>주문 내역</span>
        </CardTitle>
        <CardDescription className='text-lg'>
          구매하신 상품의 주문 내역을 확인하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className='space-y-4'>
            {orders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
              />
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant='icon'>
                <Icon
                  icon='mdi:clipboard-text-history'
                  className='size-16'
                />
              </EmptyMedia>
              <EmptyTitle className='text-3xl font-bold'>주문내역이 없습니다.</EmptyTitle>
              <EmptyDescription className='text-lg'>
                아직 주문 내역이 없습니다. 마음에 드는 상품을 골라 주문해보세요!
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className='flex gap-4'>
                <Button
                  variant='default'
                  className='h-10 w-40 text-lg font-bold transition-all hover:-translate-y-0.5 hover:shadow-md'
                  onClick={() => {
                    navigate({ to: '/products' });
                  }}
                >
                  쇼핑하러 가기
                </Button>
                <Button
                  variant='outline'
                  className='h-10 w-40 text-lg font-bold transition-all hover:-translate-y-0.5 hover:shadow-md'
                  onClick={() => {
                    navigate({ to: '/' });
                  }}
                >
                  메인으로
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
};
