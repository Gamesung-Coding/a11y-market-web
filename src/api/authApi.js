import axiosInstance from './axiosInstance';

export const authApi = {
  login: (email, password) => {
    return axiosInstance.post('/v1/auth/login', { email, password });
  },

  logout: () => {
    return axiosInstance.post('/v1/auth/logout');
  },

  kakaoJoin: (data, accessToken) => {
    return axiosInstance.post('/v1/auth/kakao-join', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getUserInfo: (accessToken) => {
    return axiosInstance.get('/v1/auth/me/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
