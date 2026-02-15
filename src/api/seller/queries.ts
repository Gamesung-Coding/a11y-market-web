import { sellerApi } from '@/api/seller';
import { SELLER_KEYS } from '@/api/seller/keys';
import { useQuery } from '@tanstack/react-query';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: SELLER_KEYS.stats(),
    queryFn: () => sellerApi.getDashboardStats(),
  });
};

export const useDailyRevenue = (year: number, month: number) => {
  return useQuery({
    queryKey: SELLER_KEYS.revenue(year, month),
    queryFn: () => sellerApi.getDailyRevenue(year, month),
  });
};

export const useTopSellingProducts = () => {
  return useQuery({
    queryKey: SELLER_KEYS.topProducts(),
    queryFn: () => sellerApi.getTopSellingProducts(),
  });
};

export const useRecentOrders = () => {
  return useQuery({
    queryKey: SELLER_KEYS.recentOrders(),
    queryFn: () => sellerApi.getRecentOrders(),
  });
};

export const useMyProducts = (page: number, size: number) => {
  return useQuery({
    queryKey: SELLER_KEYS.products(page, size),
    queryFn: () => sellerApi.getMyProducts(page, size),
  });
};

export const useReceivedOrders = (page: number, size: number, status: string | null) => {
  return useQuery({
    queryKey: SELLER_KEYS.orders(page, size, status),
    queryFn: () => sellerApi.getReceivedOrders(page, size, status),
  });
};

export const useOrderSummary = () => {
  return useQuery({
    queryKey: SELLER_KEYS.orderSummary(),
    queryFn: () => sellerApi.getOrderSummary(),
  });
};

export const useSellerInfo = (sellerId: string) => {
  return useQuery({
    queryKey: SELLER_KEYS.info(sellerId),
    queryFn: () => sellerApi.getSellerInfo(sellerId),
  });
};
