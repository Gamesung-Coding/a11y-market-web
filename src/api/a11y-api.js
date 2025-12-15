import axiosInstance from '@/api/axios-instance';

export const a11yApi = {
  getA11yProfiles: async () => {
    try {
      const resp = await axiosInstance.get(`/v1/users/me/a11y/profiles`);

      if (resp.status !== 200) {
        throw new Error('접근성 인증 프로필 조회에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  },

  createA11yProfile: async (data) => {
    try {
      const resp = await axiosInstance.post(`/v1/users/me/a11y/profiles`, data);

      if (resp.status !== 201) {
        throw new Error('접근성 인증 프로필 생성에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  },

  updateA11yProfile: async (profileId, data) => {
    try {
      const resp = await axiosInstance.put(`/v1/users/me/a11y/profiles/${profileId}`, data);

      if (resp.status !== 204) {
        throw new Error('접근성 인증 프로필 수정에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  },

  deleteA11yProfile: async (profileId) => {
    try {
      const resp = await axiosInstance.delete(`/v1/users/me/a11y/profiles/${profileId}`);

      if (resp.status !== 204) {
        throw new Error('접근성 인증 프로필 삭제에 실패했습니다.');
      }

      return resp;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  },
};
