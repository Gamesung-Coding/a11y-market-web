import axiosInstance from '@/api/axios-instance';
import type { User } from '@/api/user/types';
import type { Seller, SellerDetail } from '../seller/types';
import type { AdminSellerUpdateRequest, SellerApprovalRequest } from './types';

export const adminApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await axiosInstance.get<User[]>('/v1/admin/users');
    return data;
  },

  // 승인 대기 상품 목록 조회
  getPendingProducts: async (): Promise<any[]> => {
    const { data } = await axiosInstance.get('/v1/admin/products/pending');
    return data;
  },

  // 상품 승인/반려 처리
  updateProductStatus: async (productId: string, status: string): Promise<void> => {
    await axiosInstance.patch(`/v1/admin/products/${productId}/status`, { status });
  },

  // 판매자 승인 대기 목록 조회
  getPendingSellers: async (): Promise<SellerApprovalRequest[]> => {
    const { data } = await axiosInstance.get<SellerApprovalRequest[]>('/v1/admin/sellers/pending');
    return data;
  },

  // 판매자 정보 수정
  updateSellerInfo: async (
    sellerId: string,
    sellerInfo: AdminSellerUpdateRequest,
  ): Promise<void> => {
    await axiosInstance.patch(`/v1/admin/sellers/${sellerId}`, sellerInfo);
  },

  // 전체 판매자 목록 조회
  getAllSellers: async (): Promise<Seller[]> => {
    const { data } = await axiosInstance.get<Seller[]>('/v1/admin/sellers');
    return data;
  },

  getSellerDetail: async (sellerId: string): Promise<SellerDetail> => {
    const { data } = await axiosInstance.get<SellerDetail>(`/v1/admin/sellers/${sellerId}`);
    return data;
  },

  // 판매자 승인/반려 처리
  approveSeller: async (sellerId: string): Promise<void> => {
    await axiosInstance.post(`/v1/admin/sellers/${sellerId}/approve`);
  },

  rejectSeller: async (sellerId: string): Promise<void> => {
    await axiosInstance.post(`/v1/admin/sellers/${sellerId}/reject`);
  },

  getDashboardStats: async (): Promise<{
    pendingSellerCount: number;
    pendingProductCount: number;
  }> => {
    const { data } = await axiosInstance.get('/v1/admin/dashboard');
    return data;
  },

  updateUserRole: async (data: { userId: string; role: string }) => {
    const { data: responseData } = await axiosInstance.patch(
      `/v1/admin/users/${data.userId}/role`,
      { role: data.role },
    );
    return { data: responseData }; // return object to match existing usage { data: ... }
  },

  getAdminOrders: async (params: any) => {
    const { data } = await axiosInstance.get('/v1/admin/orders', { params });
    return data;
  },

  updateOrderItemStatus: async (orderItemId: string, status: string) => {
    await axiosInstance.patch(`/v1/admin/orders/items/${orderItemId}/status`, { status });
  },
};
