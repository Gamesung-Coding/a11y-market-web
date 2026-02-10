import axiosInstance from '@/api/axios-instance';
import type {
  UserA11yProfileAddRequest,
  UserA11yProfileResponse,
  UserA11yProfileUpdateRequest,
} from '@/types/a11y';
import { toast } from 'sonner';

export const a11yApi = {
  getA11yProfiles: async (): Promise<UserA11yProfileResponse[]> => {
    try {
      const { status, data } = await axiosInstance.get<UserA11yProfileResponse[]>(
        `/v1/users/me/a11y/profiles`,
      );

      if (status !== 200) {
        throw new Error('접근성 인증 프로필 조회에 실패했습니다.');
      }

      return data;
    } catch (err) {
      console.error(err);
      toast.error('접근성 인증 프로필 조회에 실패했습니다.');
      return Promise.reject(err);
    }
  },

  createA11yProfile: async (reqData: UserA11yProfileAddRequest): Promise<number> => {
    try {
      const { status } = await axiosInstance.post<UserA11yProfileResponse>(
        `/v1/users/me/a11y/profiles`,
        reqData,
      );

      if (status !== 201) {
        throw new Error('접근성 인증 프로필 생성에 실패했습니다.');
      }

      toast.success('접근성 인증 프로필 생성에 성공했습니다.');

      return status;
    } catch (err) {
      console.error(err);
      toast.error('접근성 인증 프로필 생성에 실패했습니다.');
      return Promise.reject(err);
    }
  },

  updateA11yProfile: async (
    req: UserA11yProfileUpdateRequest,
  ): Promise<UserA11yProfileResponse> => {
    try {
      const { status, data } = await axiosInstance.put<UserA11yProfileResponse>(
        `/v1/users/me/a11y/profiles/${req.profileId}`,
        req.data,
      );

      if (status !== 204) {
        throw new Error('접근성 인증 프로필 수정에 실패했습니다.');
      }

      return data;
    } catch (err) {
      console.error(err);
      toast.error('접근성 인증 프로필 수정에 실패했습니다.');
      return Promise.reject(err);
    }
  },

  deleteA11yProfile: async (profileId: string): Promise<void> => {
    try {
      const { status } = await axiosInstance.delete(`/v1/users/me/a11y/profiles/${profileId}`);

      if (status !== 204) {
        throw new Error('접근성 인증 프로필 삭제에 실패했습니다.');
      }

      toast.success('접근성 인증 프로필 삭제에 성공했습니다.');
    } catch (err) {
      console.error(err);
      toast.error('접근성 인증 프로필 삭제에 실패했습니다.');
      return Promise.reject(err);
    }
  },
};
