import axiosInstance from '@/api/axios-instance';
import type { Product, ProductResponse, ProductSearchParams } from './types';

export const productApi = {
  getProducts: async (params?: ProductSearchParams): Promise<ProductResponse> => {
    const { data } = await axiosInstance.get<ProductResponse>('/v1/products', { params });
    return data;
  },

  getProductDetails: async (productId: string): Promise<Product> => {
    const { data } = await axiosInstance.get<Product>(`/v1/products/${productId}`);
    return data;
  },
};
