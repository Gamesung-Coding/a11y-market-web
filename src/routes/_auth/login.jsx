import { authApi } from '@/api/auth-api';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginSuccess } from '@/store/auth-slice';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AlertCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (search) => {
    return {
      redirect: search.redirect || '/',
      error: search.error || '',
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect, error } = Route.useSearch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorType, setErrorType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await authApi.login(email, password);
      const { user, accessToken, refreshToken } = resp.data;

      dispatch(loginSuccess({ user, accessToken, refreshToken }));
      navigate({ to: redirect });
    } catch (err) {
      console.error('Login failed:', err);
      setErrorType('invalid_user');
    }
  };

  const getErrorMessage = (errType) => {
    switch (errType) {
      case 'login_required':
        return '로그인이 필요한 서비스입니다.';
      case 'unauthorized':
        return '권한이 없습니다. 다시 로그인해주세요.';
      case 'session_expired':
        return '세션이 만료되었습니다. 다시 로그인해주세요.';
      case 'invalid_user':
        return '이메일 또는 비밀번호가 올바르지 않습니다.';
      case 'invalid_access':
        return '유효하지 않은 접근입니다. 다시 시도해주세요.';
      case 'oauth_login_failed':
        return 'OAuth 로그인에 실패했습니다. 다시 시도해주세요.';
      default:
        return null;
    }
  };

  useEffect(() => {
    if (error && error.length > 0) {
      setErrorType(error);
      //setErrorMsg(getErrorMessage(error));
    }
  }, [error]);

  if (isAuthenticated) {
    navigate({ to: redirect || '/' });
    return null;
  }

  return (
    <main className='font-kakao-big-sans mx-auto max-w-lg px-4 py-10'>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className='text-2xl font-bold'>로그인</h1>
          </CardTitle>
          <CardDescription>
            <span className='text-base text-gray-600'>
              환영합니다! 이메일과 비밀번호를 입력하여 로그인하세요.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert
            variant='destructive'
            className={`grid border-red-500 bg-red-500/70 text-white ${errorType ? 'mb-4 grid-rows-[1fr]' : 'mb-0 grid-rows-[0fr] p-0 opacity-0'} transition-all`}
          >
            <AlertCircleIcon className={`${errorType ? '' : 'hidden'}`} />
            <AlertTitle className={`${errorType ? '' : 'hidden'}`}>
              {getErrorMessage(errorType)}
            </AlertTitle>
          </Alert>

          <form
            onSubmit={handleSubmit}
            className='space-y-4'
          >
            <FieldGroup>
              <Field>
                <FieldLabel
                  htmlFor='email'
                  className='text-base'
                >
                  이메일
                </FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='이메일을 입력하세요'
                  autoComplete='username'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='px-4 py-6 text-lg'
                />
              </Field>
              <Field>
                <FieldLabel
                  htmlFor='password'
                  className='text-base'
                >
                  비밀번호
                </FieldLabel>
                <Input
                  id='password'
                  type='password'
                  placeholder='비밀번호를 입력하세요'
                  className='px-4 py-6 text-lg'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field
                orientation='vertical'
                className='gap-2'
              >
                <Button
                  type='submit'
                  variant='default'
                  className='w-full text-base'
                >
                  로그인
                </Button>

                <Button
                  type='button'
                  variant='default'
                  className='w-full bg-yellow-300 text-base text-black hover:bg-yellow-400'
                  onClick={() =>
                    (window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao?redirect=${encodeURIComponent(redirect)}`)
                  }
                >
                  카카오로 3초만에 로그인
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button
            type='button'
            variant='link'
            className='w-full py-0 text-sm'
            onClick={() => navigate({ to: '/join' })}
          >
            아직 계정이 없으신가요? 회원가입
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
