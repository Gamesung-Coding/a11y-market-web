import { useGetProfile } from '@/api/user/queries';
import { useAuthStore } from '@/store/auth-store';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_need-auth')({
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuthStore();
    const { data: user, isLoading } = useGetProfile();

    if (isAuthenticated === false && !isLoading) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
    if (!isAuthenticated || !user) {
      if (!isLoading) {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.href,
          },
        });
      }
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
