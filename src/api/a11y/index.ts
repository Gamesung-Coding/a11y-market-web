import type {
  UserA11yProfile,
  UserA11yProfileAddRequest,
  UserA11yProfileUpdateRequest,
} from '@/api/a11y/types';
import axiosInstance from '@/api/axios-instance';

export const a11yApi = {
  getA11yProfiles: async (): Promise<UserA11yProfile[]> => {
    const { data } = await axiosInstance.get<UserA11yProfile[]>(`/v1/users/me/a11y/profiles`);

    return data;
  },

  createA11yProfile: async (reqData: UserA11yProfileAddRequest): Promise<void> => {
    await axiosInstance.post<UserA11yProfile>(`/v1/users/me/a11y/profiles`, reqData);
  },

  updateA11yProfile: async (req: UserA11yProfileUpdateRequest): Promise<UserA11yProfile> => {
    const { data } = await axiosInstance.put<UserA11yProfile>(
      `/v1/users/me/a11y/profiles/${req.profileId}`,
      req.data,
    );

    return data;
  },

  deleteA11yProfile: async (profileId: string): Promise<void> => {
    await axiosInstance.delete(`/v1/users/me/a11y/profiles/${profileId}`);
  },
};
