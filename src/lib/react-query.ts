import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const handleError = (err: unknown) => {
  if (err instanceof AxiosError) {
    const status = err.response?.status;
    const serverMessage = err.response?.data.message || err.message;

    switch (status) {
      case 400:
        toast(`잘못된 요청입니다: ${serverMessage}`);
        break;
      case 401:
        toast(`인증에 실패했습니다: ${serverMessage}`);
        break;
      case 403:
        toast(`잘못된 접근입니다.: ${serverMessage}`);
        break;
      case 404:
        toast(`결과를 찾을 수 없습니다: ${serverMessage}`);
        break;
      case 500:
        toast(`서버 오류입니다: ${serverMessage}`);
        break;
      default:
        toast(`오류가 발생했습니다: ${serverMessage}`);
    }
  } else {
    toast(`알 수 없는 오류가 발생했습니다`);
  }
};

export const queryClient = new QueryClient({
  // Queries (GET)
  queryCache: new QueryCache({
    onError: handleError,
  }),

  // Mutations (POST, PUT, DELETE)
  mutationCache: new MutationCache({
    onError: handleError,
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
