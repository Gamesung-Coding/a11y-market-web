import type {
  UserA11yProfileAddRequest,
  UserA11yProfileResponse,
  UserA11yProfileUpdateRequest,
} from '@/api/a11y/types';
import axiosInstance from '@/api/axios-instance';

export const a11yApi = {
  getA11yProfiles: async (): Promise<UserA11yProfileResponse[]> => {
    const { data } = await axiosInstance.get<UserA11yProfileResponse[]>(
      `/v1/users/me/a11y/profiles`,
    );

    return data;
  },

  createA11yProfile: async (reqData: UserA11yProfileAddRequest): Promise<void> => {
    await axiosInstance.post<UserA11yProfileResponse>(`/v1/users/me/a11y/profiles`, reqData);
  },

  updateA11yProfile: async (
    req: UserA11yProfileUpdateRequest,
  ): Promise<UserA11yProfileResponse> => {
    const { data } = await axiosInstance.put<UserA11yProfileResponse>(
      `/v1/users/me/a11y/profiles/${req.profileId}`,
      req.data,
    );

    return data;
  },

  deleteA11yProfile: async (profileId: string): Promise<void> => {
    await axiosInstance.delete(`/v1/users/me/a11y/profiles/${profileId}`);
  },
};
