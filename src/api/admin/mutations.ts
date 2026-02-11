import { adminApi } from '@/api/admin';
import { ADMIN_KEYS } from '@/api/admin/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ProductStatus } from '../product/types';
import type { AdminSellerUpdateRequest } from './types';

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      adminApi.updateUserRole({ userId, role }),
    onSuccess: () => {
      toast.success('회원 권한이 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.users() });
    },
    onError: (error) => {
      console.error('Failed to update user role:', error);
      toast.error('회원 권한 변경에 실패했습니다.');
    },
  });
};

export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, status }: { productId: string; status: ProductStatus }) =>
      adminApi.updateProductStatus(productId, status),
    onSuccess: () => {
      toast.success('상품 상태가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.pendingProducts() });
    },
    onError: (error) => {
      console.error('Failed to update product status:', error);
      toast.error('상품 상태 변경에 실패했습니다.');
    },
  });
};

export const useUpdateSellerInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sellerId,
      sellerInfo,
    }: {
      sellerId: string;
      sellerInfo: AdminSellerUpdateRequest;
    }) => adminApi.updateSellerInfo(sellerId, sellerInfo),
    onSuccess: () => {
      toast.success('판매자 정보가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.pendingSellers() });
    },
    onError: (error) => {
      console.error('Failed to update seller info:', error);
      toast.error('판매자 정보 변경에 실패했습니다.');
    },
  });
};

export const useApproveSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sellerId: string) => adminApi.approveSeller(sellerId),
    onSuccess: () => {
      toast.success('판매자가 승인되었습니다.');
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.pendingSellers() });
    },
    onError: (error) => {
      console.error('Failed to approve seller:', error);
      toast.error('판매자 승인에 실패했습니다.');
    },
  });
};

export const useRejectSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sellerId: string) => adminApi.rejectSeller(sellerId),
    onSuccess: () => {
      toast.success('판매자가 거절되었습니다.');
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.pendingSellers() });
    },
    onError: (error) => {
      console.error('Failed to reject seller:', error);
      toast.error('판매자 거절에 실패했습니다.');
    },
  });
};
