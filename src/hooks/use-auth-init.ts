import { useAuthActions } from '@/store/auth-store';
import axios from 'axios';
import { useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAuthInit() {
  const { loginSucess, logout } = useAuthActions();

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        logout();
        return;
      }

      try {
        const resp = await axios.post(`${API_BASE_URL}/api/v1/auth/login-refresh`, {
          refreshToken: refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = resp.data;

        loginSucess(accessToken, newRefreshToken);
      } catch (err) {
        console.error('Auth initialization failed:', err);
        logout();
      }
    };

    initAuth();
  }, []);
}
