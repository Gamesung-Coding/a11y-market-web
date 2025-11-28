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
