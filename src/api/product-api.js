import axiosInstance from './axios-instance';

export const productApi = {
  getProductDetails: (productId) => axiosInstance.get(`/v1/products/${productId}`),
};
