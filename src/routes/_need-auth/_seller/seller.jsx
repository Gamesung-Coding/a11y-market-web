import { ROLES } from '@/constants/roles';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useSelector } from 'react-redux';

export const Route = createFileRoute('/_need-auth/_seller/seller')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (user?.userRole !== ROLES.SELLER) {
    navigate({
      to: '/unauthorized',
    });
  }

  return <Outlet />;
}
