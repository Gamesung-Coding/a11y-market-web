import axiosInstance from './axios-instance';

export const mainApi = {
  getEventBanners: async () => {
    try {
      const resp = await axiosInstance.get('/v1/main/events');

      if (resp.status !== 200) {
        throw new Error('이벤트 배너 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error('Error during getEventBanners:', err);
      return Promise.reject(err);
    }
  },

  getPopularItems: async () => {
    try {
      const resp = await axiosInstance.get('/v1/main/products/populars');

      if (resp.status !== 200) {
        throw new Error('인기 상품 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error('Error during getPopularItems:', err);
      return Promise.reject(err);
    }
  },

  getCategories: async () => {
    try {
      const resp = await axiosInstance.get('/v1/main/products/categories');

      if (resp.status !== 200) {
        throw new Error('카테고리 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error('Error during getCategories:', err);
      return Promise.reject(err);
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const resp = await axiosInstance.get(`/v1/categories/${categoryId}/products`);

      if (resp.status !== 200) {
        throw new Error('카테고리별 상품 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error('Error during getProductsByCategory:', err);
      return Promise.reject(err);
    }
  },
};
