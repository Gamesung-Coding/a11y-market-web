import axiosInstance from './axiosInstance';

// 내 주문 목록 조회
export const getMyOrders = async () => {
  const res = await axiosInstance.get('/v1/users/me/orders');
  return res.data;
};

// 주문 상세 조회
export const getMyOrderDetail = async (orderId) => {
  const res = await axiosInstance.get(`/v1/users/me/orders/${orderId}`);
  return res.data;
};

// 주문 취소 요청
export const cancelOrder = async (orderId, data) => {
  const res = await axiosInstance.post(`/v1/users/me/orders/${orderId}/cancel-request`, data);

  return res.data;
};

//결제 전 주문 정보 조회
export async function getCheckoutInfo(orderItemIds, orderAllItems = false) {
  const response = await axiosInstance.post('/v1/orders/pre-check', {
    checkoutItemIds: orderItemIds,
    orderAllItems,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    return {
      status: response.data.status || 'ERROR',
      message: response.data.message || '주문 정보 조회 실패',
    };
  }
}

// 주문 생성
export async function createOrder(addressId, orderItemIds) {
  const response = await axiosInstance.post('/v1/orders', {
    addressId,
    orderItemIds,
  });

  if (response.status === HttpStatusCode.Created) {
    return response.data;
  } else {
    return {
      status: response.data.status || 'ERROR',
      message: response.data.message || '주문 정보 조회 실패',
    };
  }
}
