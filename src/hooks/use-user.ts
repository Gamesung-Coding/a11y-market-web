import axiosInstance from '@/api/axios-instance';
import { useAuthStore } from '@/store/auth-store';
import type { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['user-info', 'me'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>('/api/users/me');
      return data;
    },
    // accessToken이 있을 때만 쿼리 실행
    enabled: !!accessToken,
    // 10분
    staleTime: 1000 * 60 * 10,
    // 실패 시 재시도 하지 않음
    retry: false,
  });
};
