import { store } from '@/store/store';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_needAuth')({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated, isLoading } = store.getState().auth;

    if (isLoading) return;
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
          error: 'login_required',
        },
      });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
