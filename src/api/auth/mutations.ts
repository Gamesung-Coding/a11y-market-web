import { useAuthActions } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { authApi } from '.';

export const useLogout = () => {
  const { logout: clearClientAuth } = useAuthActions();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearClientAuth();
      queryClient.clear();
      navigate({ to: '/' });
    },
  });
};
