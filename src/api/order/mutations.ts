import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orderApi } from './index';
import { orderKeys } from './keys';
import type { CancelOrderRequest, CreateOrderRequest, VerifyPaymentRequest } from './types';

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CancelOrderRequest) => orderApi.cancelOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.list() });
      toast.success('주문 취소 요청이 접수되었습니다.');
    },
    onError: (error) => {
      console.error('Cancel order error:', error);
      toast.error('주문 취소 요청에 실패했습니다.');
    },
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderApi.createOrder(data),
    onError: (error) => {
      console.error('Create order error:', error);
      toast.error('주문 생성에 실패했습니다.');
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: (data: VerifyPaymentRequest) => orderApi.verifyPayment(data),
    onError: (error) => {
      console.error('Verify payment error:', error);
      toast.error('결제 승인에 실패했습니다.');
    },
  });
};

export const useGetCheckoutInfo = () => {
  return useMutation({
    mutationFn: (data: {
      cartItemIds: string[];
      directOrderItem?: { productId: string; quantity: number };
    }) => orderApi.getCheckoutInfoV2(data.cartItemIds, data.directOrderItem),
    onError: (error) => {
      console.error('Get checkout info error:', error);
      toast.error('결제 전 정보 조회에 실패했습니다.');
    },
  });
};

export const useConfirmOrderItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { orderItemId: string }) => orderApi.confirmOrderItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.list() });
      toast.success('구매 확정이 완료되었습니다.');
    },
    onError: (error) => {
      console.error('Confirm order item error:', error);
      toast.error('구매 확정에 실패했습니다.');
    },
  });
};
