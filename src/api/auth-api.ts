import axiosInstance from '@/api/axios-instance';
import { useAuthActions } from '@/store/auth-store';
import type {
  CheckExistsResponse,
  JoinRequest,
  KakaoJoinRequest,
  LoginRequest,
  LoginResponse,
} from '@/types/auth';
import { toast } from 'sonner';

export const authApi = {
  login: async ({ email, password }: LoginRequest): Promise<void> => {
    try {
      const { status, data } = await axiosInstance.post<LoginResponse>('/v1/auth/login', {
        email,
        password,
      });

      if (status !== 200) {
        throw new Error('로그인에 실패했습니다.');
      }

      const { accessToken, refreshToken } = data;

      useAuthActions().loginSucess(accessToken, refreshToken);
      toast.success('로그인에 성공했습니다.');
    } catch (err) {
      console.error('Error during login:', err);
      toast.error('로그인에 실패했습니다.');
      return Promise.reject(err);
    }
  },

  logout: async (): Promise<void> => {
    try {
      const { status } = await axiosInstance.post<void>('/v1/auth/logout');

      if (status !== 200) {
        throw new Error('로그아웃에 실패했습니다.');
      }

      useAuthActions().logout();
      toast.success('로그아웃에 성공했습니다.');
    } catch (err) {
      console.error('Error during logout:', err);
      toast.error('로그아웃 도중 오류가 발생했습니다.');
      return Promise.reject(err);
    }
  },

  join: async (data: JoinRequest): Promise<void> => {
    try {
      const { status } = await axiosInstance.post<void>('/v1/auth/join', data);

      if (status !== 201) {
        throw new Error('회원가입에 실패했습니다.');
      }

      toast.success('회원가입에 성공했습니다.');
    } catch (err) {
      console.error('Error during join:', err);
      toast.error('회원가입에 실패했습니다.');
      return Promise.reject(err);
    }
  },

  kakaoJoin: async (data: KakaoJoinRequest, accessToken: string): Promise<void> => {
    try {
      const { status } = await axiosInstance.post<void>('/v1/auth/kakao-join', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (status !== 201) {
        throw new Error('카카오 회원가입에 실패했습니다.');
      }

      toast.success('카카오 회원가입에 성공했습니다.');
    } catch (err) {
      console.error('Error during kakaoJoin:', err);
      toast.error('카카오 회원가입에 실패했습니다.');
      return Promise.reject(err);
    }
  },

  getUserInfo: async (accessToken: string): Promise<LoginResponse> => {
    try {
      const { status, data } = await axiosInstance.get<LoginResponse>('/v1/auth/me/info', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (status !== 200) {
        throw new Error('사용자 정보 조회에 실패했습니다.');
      }

      toast.success('사용자 정보 조회에 성공했습니다.');

      return data;
    } catch (err) {
      console.error('Error during getUserInfo:', err);
      return Promise.reject(err);
    }
  },

  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      const { status, data } = await axiosInstance.get<CheckExistsResponse>(
        '/v1/auth/check/email',
        {
          params: { email },
        },
      );

      if (status !== 200) {
        throw new Error('이메일 중복 확인에 실패했습니다.');
      }

      return data.isAvailable;
    } catch (err) {
      console.error('Error during checkEmailExists:', err);
      return Promise.reject(err);
    }
  },

  checkNicknameExists: async (nickname: string): Promise<boolean> => {
    try {
      const { status, data } = await axiosInstance.get<CheckExistsResponse>(
        '/v1/auth/check/nickname',
        {
          params: { nickname },
        },
      );

      if (status !== 200) {
        throw new Error('닉네임 중복 확인에 실패했습니다.');
      }

      return data.isAvailable;
    } catch (err) {
      console.error('Error during checkNicknameExists:', err);
      return Promise.reject(err);
    }
  },

  checkPhoneExists: async (phone: string): Promise<boolean> => {
    try {
      const { status, data } = await axiosInstance.get<CheckExistsResponse>(
        '/v1/auth/check/phone',
        {
          params: { phone },
        },
      );

      if (status !== 200) {
        throw new Error('전화번호 중복 확인에 실패했습니다.');
      }

      return data.isAvailable;
    } catch (err) {
      console.error('Error during checkPhoneExists:', err);
      return Promise.reject(err);
    }
  },
};
