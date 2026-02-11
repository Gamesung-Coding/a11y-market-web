import { cartApi } from '@/api/cart';
import { CART_KEYS } from '@/api/cart/keys';
import type { AddCartItemRequest, UpdateCartItemRequest } from '@/api/cart/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useAddCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddCartItemRequest) => cartApi.addCartItem(params),

    // 낙관적 업데이트 설정
    onMutate: async (newItem) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: CART_KEYS.count() });

      // 이전 카트 카운트 스냅샷 저장
      const previousCount = queryClient.getQueryData<number>(CART_KEYS.count());

      // 낙관적 업데이트: 카트 카운트 증가
      // 기존 카운트가 있으면 그 값을 사용하고, 없으면 0으로 초기화
      queryClient.setQueryData<number>(CART_KEYS.count(), (old) => {
        return (old ?? 0) + newItem.quantity;
      });

      // Context로 스냅샷 반환
      return { previousCount };
    },

    // 오류 발생 시 롤백
    onError: (_err, _newItem, context) => {
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData<number>(CART_KEYS.count(), context.previousCount);
      }

      toast.error('장바구니에 추가하는 중 오류가 발생했습니다.');
    },

    // 성공 또는 실패 후 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.count() });
      queryClient.invalidateQueries({ queryKey: CART_KEYS.items() });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateCartItemRequest) => cartApi.updateCartItemQuantity(params),

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: CART_KEYS.count() });

      const previousCount = queryClient.getQueryData<number>(CART_KEYS.count());

      queryClient.setQueryData<number>(CART_KEYS.count(), (old) => {
        return (old ?? 0) + newItem.quantity;
      });

      return { previousCount };
    },

    onError: (_err, _newItem, context) => {
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData<number>(CART_KEYS.count(), context.previousCount);
      }

      toast.error('장바구니에 추가하는 중 오류가 발생했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.count() });
      queryClient.invalidateQueries({ queryKey: CART_KEYS.items() });
    },
  });
};

export const useDeleteCartItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: string[]) => cartApi.deleteCartItems(params),

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: CART_KEYS.count() });

      const previousCount = queryClient.getQueryData<number>(CART_KEYS.count());

      queryClient.setQueryData<number>(CART_KEYS.count(), (old) => {
        return (old ?? 0) - newItem.length;
      });

      return { previousCount };
    },

    onError: (_err, _newItem, context) => {
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData<number>(CART_KEYS.count(), context.previousCount);
      }

      toast.error('장바구니에 추가하는 중 오류가 발생했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.count() });
      queryClient.invalidateQueries({ queryKey: CART_KEYS.items() });
    },
  });
};
