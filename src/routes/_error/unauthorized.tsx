import { ErrorEmpty } from '@/components/main/error-empty';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_error/unauthorized')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ErrorEmpty
      prevPath='/'
      message='접근 권한이 없습니다.'
    />
  );
}
