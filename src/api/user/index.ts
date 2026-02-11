import axiosInstance from '@/api/axios-instance';
import type { UpdateProfileRequest, User } from './types';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const { data } = await axiosInstance.get<User>('/v1/users/me');
    return data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const { data: responseData } = await axiosInstance.patch<User>('/v1/users/me', data);
    return responseData;
  },

  withdrawAccount: async (password: string): Promise<void> => {
    await axiosInstance.delete('/v1/users/me', {
      data: {
        userPassword: password,
      },
    });
  },
};
