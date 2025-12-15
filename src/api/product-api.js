import axiosInstance from './axios-instance';

export const productApi = {
  getProducts: async (params) => {
    try {
      const resp = await axiosInstance.get('/v1/products', { params });

      if (resp.status !== 200) {
        throw new Error('상품 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error('Error during getProducts:', err);
      return Promise.reject(err);
    }
  },

  getProductDetails: async (productId) => {
    try {
      const resp = await axiosInstance.get(`/v1/products/${productId}`);

      if (resp.status !== 200) {
        throw new Error('상품 상세 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error('Error during getProductDetails:', err);
      return Promise.reject(err);
    }
  },
};
