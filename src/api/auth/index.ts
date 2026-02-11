import axiosInstance from '@/api/axios-instance';
import { useAuthActions } from '@/store/auth-store';
import { toast } from 'sonner';
import type {
  CheckExistsResponse,
  JoinRequest,
  KakaoJoinRequest,
  LoginRequest,
  LoginResponse,
} from './types';

export const authApi = {
  login: async ({ email, password }: LoginRequest): Promise<void> => {
    const { data } = await axiosInstance.post<LoginResponse>('/v1/auth/login', {
      email,
      password,
    });

    const { accessToken, refreshToken } = data;

    useAuthActions().setToken(accessToken, refreshToken);
    toast.success('로그인에 성공했습니다.');
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post<void>('/v1/auth/logout');

    useAuthActions().logout();
    toast.success('로그아웃에 성공했습니다.');
  },

  join: async (data: JoinRequest): Promise<void> => {
    await axiosInstance.post<void>('/v1/auth/join', data);
    toast.success('회원가입에 성공했습니다.');
  },

  kakaoJoin: async (data: KakaoJoinRequest, accessToken: string): Promise<void> => {
    await axiosInstance.post<void>('/v1/auth/kakao-join', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    toast.success('카카오 회원가입에 성공했습니다.');
  },

  getUserInfo: async (accessToken: string): Promise<LoginResponse> => {
    const { data } = await axiosInstance.get<LoginResponse>('/v1/auth/me/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  checkEmailExists: async (email: string): Promise<boolean> => {
    const { data } = await axiosInstance.get<CheckExistsResponse>('/v1/auth/check/email', {
      params: { email },
    });
    return data.isAvailable;
  },

  checkNicknameExists: async (nickname: string): Promise<boolean> => {
    const { data } = await axiosInstance.get<CheckExistsResponse>('/v1/auth/check/nickname', {
      params: { nickname },
    });
    return data.isAvailable;
  },

  checkPhoneExists: async (phone: string): Promise<boolean> => {
    const { data } = await axiosInstance.get<CheckExistsResponse>('/v1/auth/check/phone', {
      params: { phone },
    });
    return data.isAvailable;
  },
};
