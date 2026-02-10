import type { Category } from '@/types/category';
import { toast } from 'sonner';
import axiosInstance from './axios-instance';

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const { status, data } = await axiosInstance.get<Category[]>('/v1/categories');

      if (status !== 200) {
        throw new Error('카테고리 조회에 실패했습니다.');
      }

      return data;
    } catch (err) {
      console.error('Error during getCategories:', err);
      toast.error('카테고리 조회에 실패했습니다.');
      return Promise.reject(err);
    }
  },
};
