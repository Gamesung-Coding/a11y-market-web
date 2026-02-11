import { adminApi } from '@/api/admin';
import { ADMIN_KEYS } from '@/api/admin/keys';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.users(),
    queryFn: () => adminApi.getUsers(),
  });
};

export const useGetSellerDetail = (sellerId: string) => {
  return useQuery({
    queryKey: ADMIN_KEYS.sellerDetail(sellerId),
    queryFn: () => adminApi.getSellerDetail(sellerId),
  });
};

export const usePendingProducts = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.pendingProducts(),
    queryFn: () => adminApi.getPendingProducts(),
  });
};

export const usePendingSellers = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.pendingSellers(),
    queryFn: () => adminApi.getPendingSellers(),
  });
};
