import axiosInstance from './axios-instance';

export const userApi = {
  getProfile: () => axiosInstance.get('/v1/users/me'),
  updateProfile: (data) => axiosInstance.patch('/v1/users/me', data),
};
