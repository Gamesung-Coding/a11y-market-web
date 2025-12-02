import axiosInstance from './axiosInstance';

export const adminApi = {
  getUsers: () => axiosInstance.get('/v1/admin/users'),
};