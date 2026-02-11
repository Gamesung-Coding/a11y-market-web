import { useDashboardStats } from '@/api/admin/queries';
import { ErrorEmpty } from '@/components/main/error-empty';
import { LoadingEmpty } from '@/components/main/loading-empty';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_need-auth/_admin/admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: dashboardData, isLoading } = useDashboardStats();

  if (isLoading) {
    return <LoadingEmpty />;
  }

  if (!dashboardData) {
    return (
      <ErrorEmpty
        message='대시보드 정보를 불러오지 못했습니다.'
        prevPath='/'
      />
    );
  }

  return (
    <>
      <div className='font-kakao-big mb-10 text-center text-3xl font-semibold'>관리자페이지</div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <Card className='shadow-md'>
          <CardContent>
            <div className='font-kakao-big mb-2 text-lg font-medium'>승인 대기 판매자</div>
            <div className='font-kakao-big text-gray-600'>
              {`현재 미승인 판매자 수는 ${dashboardData.pendingSellersCount}명 입니다.`}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant='default'
              className='w-full'
              onClick={() => navigate({ to: '/admin/sellers/approval' })}
            >
              판매자 관리
            </Button>
          </CardFooter>
        </Card>

        <Card className='shadow-md'>
          <CardContent>
            <div className='font-kakao-big mb-2 text-lg font-medium'>미승인 상품</div>
            <div className='font-kakao-big text-gray-600'>
              {`현재 미승인 상품 수는 ${dashboardData.pendingProductsCount}개 입니다.`}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant='default'
              className='w-full'
              onClick={() => navigate({ to: '/admin/products/approval' })}
            >
              상품 승인 관리
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
