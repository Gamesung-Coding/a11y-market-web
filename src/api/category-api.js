import axiosInstance from './axios-instance';

export const categoryApi = {
  getCategories: async () => {
    try {
      const resp = await axiosInstance.get('/v1/categories');

      if (resp.status !== 200) {
        throw new Error('카테고리 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error('Error during getCategories:', err);
      return Promise.reject(err);
    }
  },
};
