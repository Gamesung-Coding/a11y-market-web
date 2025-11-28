// components/order/OrderList.jsx

import { Alert, AlertDescription } from '@/components/ui/alert';
import OrderCard from './OrderCard';

export default function OrderList({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <Alert
        variant='default'
        className='py-10'
      >
        <AlertDescription className='text-center'>주문 내역이 없습니다.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-6'>
      {orders.map((order) => (
        <OrderCard
          key={order.orderId}
          order={order}
        />
      ))}
    </div>
  );
}
