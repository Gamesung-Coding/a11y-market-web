export const ORDER_ITEM_STATUS = {
  ORDERED: 'ORDERED',
  PAID: 'PAID',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
  SHPPING: 'SHIPPING',
  SHIPPED: 'SHIPPED',
  CONFIRMED: 'CONFIRMED',
  CANCEL_PENDING: 'CANCEL_PENDING',
  CANCELED: 'CANCELED',
  CANCEL_REJECTED: 'CANCEL_REJECTED',
  RETURN_PENDING: 'RETURN_PENDING',
  RETURNED: 'RETURNED',
  RETURN_REJECTED: 'RETURN_REJECTED',
};

export const statusLabel = (status: string) => {
  switch (status) {
    case ORDER_ITEM_STATUS.ORDERED:
      return {
        className: 'bg-violet-500 dark:text-white',
        label: '결제 대기 중',
      };
    case ORDER_ITEM_STATUS.PAID:
      return {
        className: 'bg-blue-500 dark:text-white',
        label: '결제 완료',
      };
    case ORDER_ITEM_STATUS.REJECTED:
      return {
        className: 'bg-red-500 dark:text-white',
        label: '주문 거절됨',
      };
    case ORDER_ITEM_STATUS.ACCEPTED:
      return {
        className: 'bg-purple-500 dark:text-white',
        label: '주문 접수됨',
      };
    case ORDER_ITEM_STATUS.SHPPING:
      return {
        className: 'bg-yellow-500 dark:text-white',
        label: '배송 중',
      };
    case ORDER_ITEM_STATUS.SHIPPED:
      return {
        className: 'bg-indigo-500 dark:text-white',
        label: '배송 완료',
      };
    case ORDER_ITEM_STATUS.CONFIRMED:
      return {
        className: 'bg-teal-700 dark:text-white',
        label: '구매 확정됨',
      };
    case ORDER_ITEM_STATUS.CANCEL_PENDING:
      return {
        className: 'bg-orange-700 dark:text-white',
        label: '취소 요청 중',
      };
    case ORDER_ITEM_STATUS.CANCELED:
      return {
        className: 'bg-neutral-500 dark:text-white',
        label: '주문 취소됨',
      };
    case ORDER_ITEM_STATUS.CANCEL_REJECTED:
      return {
        className: 'bg-red-700 dark:text-white',
        label: '주문 취소 거절됨',
      };
    case ORDER_ITEM_STATUS.RETURN_PENDING:
      return {
        className: 'bg-yellow-500 dark:text-white',
        label: '반품 요청 중',
      };
    case ORDER_ITEM_STATUS.RETURNED:
      return {
        className: 'bg-orange-500 dark:text-white',
        label: '반품 완료됨',
      };
    case ORDER_ITEM_STATUS.RETURN_REJECTED:
      return {
        className: 'bg-red-700 dark:text-white',
        label: '상품 반품 거절됨',
      };
    default:
      return {
        className: 'bg-neutral-500 dark:text-white',
        label: '알 수 없음',
      };
  }
};
