import { ROLES } from '@/constants/roles';
import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router';
import { useSelector } from 'react-redux';

export const Route = createFileRoute('/_needAuth/_seller/seller')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log('Seller RouteComponent rendered', { user, isAuthenticated, isLoading });
  if (isLoading) {
    return <LoadingEmpty />;
  }

  if (user?.userRole !== ROLES.SELLER) {
    console.log('Redirecting to /unauthorized because user is not a seller');
    navigate({
      to: '/unauthorized',
    });
  }

  return <Outlet />;
}
