import axiosInstance from './axios-instance';

export const adminApi = {
  getUsers: () => axiosInstance.get('/v1/admin/users'),
};
