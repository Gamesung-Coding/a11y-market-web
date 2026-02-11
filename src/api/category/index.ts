import axiosInstance from '@/api/axios-instance';
import type { Category } from './types';

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get<Category[]>('/v1/categories');
    return data;
  },
};
