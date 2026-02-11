import { authApi } from '@/api/auth';
import { Spinner } from '@/components/ui/spinner';
import { useAuthActions } from '@/store/auth-store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

interface OAuthRedirectSearch {
  redirect?: string;
  token?: string;
}

export const Route = createFileRoute('/_auth/auth/oauth-redirect')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): OAuthRedirectSearch => ({
    redirect: (search.redirect as string) || '/',
    token: (search.token as string) || undefined,
  }),
});

function RouteComponent() {
  const { token: accessToken, redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { setToken: loginSuccess } = useAuthActions();

  const checkLogin = async () => {
    if (accessToken) {
      try {
        const tokens = await authApi.getUserInfo(accessToken);

        const { accessToken: newAccessToken, refreshToken } = tokens;

        if (newAccessToken && refreshToken) {
          loginSuccess(newAccessToken, refreshToken);
          navigate({ to: redirect });
        } else {
          throw new Error('Missing tokens');
        }
      } catch (err) {
        navigate({
          to: '/login',
          search: { error: 'oauth_login_failed' },
        });
        console.error('OAuth login failed:', err);
      }
    } else {
      navigate({
        to: '/login',
        search: { error: 'invalid_access' },
      });
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <Spinner className='mb-6 size-24' />
      <h1 className='mb-4 text-2xl font-bold'>OAuth 로그인 처리 중...</h1>
      <p className='text-gray-600'>잠시만 기다려주세요.</p>
    </main>
  );
}
