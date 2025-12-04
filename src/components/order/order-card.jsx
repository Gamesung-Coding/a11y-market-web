// components/order/OrderCard.jsx

import { cancelOrder } from '@/api/order-api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import CancelModal from './cancel-modal';

const statusLabel = (status) => {
  switch (status) {
    case 'ORDERED':
      return '주문완료';
    case 'PAID':
      return '결제완료';
    case 'SHIPPED':
      return '배송중';
    case 'CONFIRMED':
      return '구매확정';
    case 'CANCEL_PENDING':
      return '취소요청 중';
    case 'CANCELED':
      return '취소완료';
    case 'RETURN_PENDING':
      return '반품요청 중';
    case 'RETURNED':
      return '반품완료';
    default:
      return status;
  }
};

export default function OrderCard({ order }) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const formatPhone = (phone) => {
    if (!phone) return '정보 없음';
    return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  return (
    <Card className='border-none bg-transparent shadow-none'>
      <CardContent className='space-y-2'>
        {order.orderItems?.map((item) => (
          <div
            key={item.orderItemId}
            className='flex items-center justify-between gap-6 rounded-lg border p-4'
          >
            <div className='flex items-start gap-4'>
              {/* 나중에 이미지 연결 */}
              <Link
                to='/products/$productId'
                params={{ productId: item.productId }}
              >
                <img
                  src={item.productImageUrl || '/no-image.png'}
                  alt={item.productName}
                  className='h-24 w-24 cursor-pointer object-cover'
                />
              </Link>

              <div className='space-y-1'>
                <p className='font-semibold'>{item.productName}</p>
                <p className='text-gray-600'>
                  가격:{' '}
                  {typeof item.productPrice === 'number' ? item.productPrice.toLocaleString() : '-'}
                  원 | 수량: {item.productQuantity}
                </p>
                <p className='text-gray-600'>
                  총액: {(item.productPrice * item.productQuantity).toLocaleString()}원
                </p>
                <p>상태: {statusLabel(item.orderItemStatus)}</p>
              </div>
            </div>

            {['ORDERED', 'PAID'].includes(item.orderItemStatus) && (
              <Button
                variant='default'
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(true);
                }}
              >
                주문 취소
              </Button>
            )}
          </div>
        ))}
      </CardContent>

      <CardFooter className='flex flex-col items-start gap-4'>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='font-semibold underline'
        >
          {open ? '상세 닫기 ▲' : '상세 보기 ▼'}
        </button>
        {open && (
          <div className='mt-4 w-full space-y-2 rounded-lg p-4'>
            <p>주문번호: {order.orderId}</p>
            <p>수령인: {order.receiverName}</p>
            <p>연락처: {formatPhone(order.receiverPhone)}</p>
            <p>
              주소: {order.receiverAddr1} {order.receiverAddr2}
            </p>
            <p>우편번호: {order.receiverZipcode}</p>
            <p>결제수단: {order.paymentMethod || '카드'}</p>
            <p>주문일시: {order.createdAt}</p>
          </div>
        )}

        {selectedItem && (
          <CancelModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            item={selectedItem}
            onSubmit={async (reason) => {
              try {
                await cancelOrder(order.orderId, {
                  orderItemId: selectedItem.orderItemId,
                  reason: reason,
                });
                alert('취소 요청이 접수되었습니다.');
                window.location.reload();
                setIsOpen(false);
              } catch {
                alert('취소 요청 실패');
              }
            }}
          />
        )}
      </CardFooter>
    </Card>
  );
}
