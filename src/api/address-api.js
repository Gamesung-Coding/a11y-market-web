import axiosInstance from '@/api/axios-instance';

export const addressApi = {
  // 전체 배송지 조회
  getAddressList: async () => {
    return await axiosInstance.get('/v1/users/me/address');
  },

  // 기본 배송지 조회
  getDefaultAddress: async () => {
    return await axiosInstance.get('/v1/users/me/default-address');
  },

  // 신규 배송지 등록
  createAddress: async (data) => {
    return await axiosInstance.post('/v1/users/me/address', data);
  },

  // 배송지 수정
  updateAddress: async (addressId, data) => {
    return await axiosInstance.put(`/v1/users/me/address/${addressId}`, data);
  },

  // 배송지 삭제
  deleteAddress: async (addressId) => {
    return await axiosInstance.delete(`/v1/users/me/address/${addressId}`);
  },

  // 기본 배송지 변경
  updateDefaultAddress: async (addressId) => {
    return await axiosInstance.patch('/v1/users/me/default-address', {
      addressId,
    });
  },
};
