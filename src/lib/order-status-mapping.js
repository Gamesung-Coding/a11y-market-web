export const getOrderStatusLabel = (status) => {
  // PENDING,
  // PAID,
  // ACCEPTED,
  // REJECTED,
  // SHIPPED,
  // DELIVERED,
  // CANCELLED
  switch (status) {
    case 'PENDING':
      return '결제 대기';
    case 'PAID':
      return '결제 완료';
    case 'ACCEPTED':
      return '주문 승인';
    case 'REJECTED':
      return '주문 거절';
    case 'SHIPPED':
      return '배송 중';
    case 'DELIVERED':
      return '배송 완료';
    case 'CANCELLED':
      return '주문 취소';
    default:
      return '알 수 없음';
  }
};

export const getOrderItemStatusLabel = (status) => {
  // ORDERED,
  // PAID,
  // SHIPPED,
  // CONFIRMED,
  // CANCEL_PENDING,
  // CANCELED,
  // RETURN_PENDING,
  // RETURNED

  switch (status) {
    case 'ORDERED':
      return '주문 완료';
    case 'PAID':
      return '결제 완료';
    case 'SHIPPED':
      return '배송 중';
    case 'CONFIRMED':
      return '구매 확정';
    case 'CANCEL_PENDING':
      return '취소 요청됨';
    case 'CANCELED':
      return '취소됨';
    case 'RETURN_PENDING':
      return '반품 요청됨';
    case 'RETURNED':
      return '반품됨';
    default:
      return '알 수 없음';
  }
};
