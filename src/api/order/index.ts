import axiosInstance from '@/api/axios-instance';
import type {
  CancelOrderRequest,
  CheckoutInfoResponse,
  CreateOrderRequest,
  Order,
  OrderDetailResponse,
  VerifyPaymentRequest,
} from './types';

export const orderApi = {
  // 내 주문 목록 조회
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await axiosInstance.get<Order[]>('/v1/users/me/orders');
    return data;
  },

  // 주문 상세 조회
  getMyOrderDetail: async (orderItemId: string | number): Promise<OrderDetailResponse> => {
    const { data } = await axiosInstance.get<OrderDetailResponse>(
      `/v1/users/me/orders/${orderItemId}`,
    );
    return data;
  },

  // 주문 취소 요청
  cancelOrder: async (data: CancelOrderRequest): Promise<void> => {
    await axiosInstance.post(`/v1/users/me/orders/cancel-request`, data);
  },

  // 결제 전 주문 정보 조회 (Legacy)
  getCheckoutInfo: async () => {
    return await axiosInstance.post('/v1/orders/pre-check');
  },

  // 결제 전 주문 정보 조회 V2
  getCheckoutInfoV2: async (
    cartItemIds: string[],
    directOrderItem?: { productId: string; quantity: number },
  ): Promise<CheckoutInfoResponse> => {
    const { data } = await axiosInstance.post<CheckoutInfoResponse>('/v2/orders/pre-check', {
      cartItemIds,
      directOrderItem,
    });
    return data;
  },

  // 주문 생성
  createOrder: async (data: CreateOrderRequest): Promise<any> => {
    const { data: responseData } = await axiosInstance.post('/v1/orders', data);
    return responseData;
  },

  // 결제 검증
  verifyPayment: async (data: VerifyPaymentRequest): Promise<void> => {
    await axiosInstance.post(`/v1/payments/verify`, data);
  },

  confirmOrderItem: async (data: { orderItemId: string }): Promise<void> => {
    await axiosInstance.post(`/v1/users/me/orders/items/confirm`, data);
  },
};
