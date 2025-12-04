import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

/** /admin/products/pending : 관리자 상품 등록 신청 관리 페이지 */
export const Route = createFileRoute('/_need-auth/_admin/admin/products')({
  component: AdminProductPendingPage,
});

/** API 연동 전까지 사용할 임시 데이터 */
const MOCK_PENDING_PRODUCTS = [
  {
    id: 'P-1001',
    name: '저염 갓김치 1kg',
    categoryName: '저염 장아찌/김치',
    price: 12900,
    sellerName: '박철수 전통식품',
    sellerGrade: '일반',
    submittedAt: '2025-11-25',
    status: 'PENDING',
  },
  {
    id: 'P-1002',
    name: '무설탕 검은콩 두유 24팩',
    categoryName: '무설탕 건강즙/음료',
    price: 24900,
    sellerName: '건강푸드몰',
    sellerGrade: '우수',
    submittedAt: '2025-11-26',
    status: 'PENDING',
  },
  {
    id: 'P-1003',
    name: '경량 접이식 지팡이(실버)',
    categoryName: '보조기구',
    price: 15900,
    sellerName: '편안한보조기구샵',
    sellerGrade: '신규',
    submittedAt: '2025-11-27',
    status: 'PENDING',
  },
];

function AdminProductPendingPage() {
  const [products, setProducts] = useState(MOCK_PENDING_PRODUCTS);

  const totalCount = products.length;
  const pendingCount = products.filter((p) => p.status === 'PENDING').length;
  const approvedCount = products.filter((p) => p.status === 'APPROVED').length;
  const rejectedCount = products.filter((p) => p.status === 'REJECTED').length;

  const formatPrice = (value) => new Intl.NumberFormat('ko-KR').format(value);

  const handleUpdateStatus = (productId, nextStatus) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, status: nextStatus } : p)));
    // TODO: PATCH /api/v1/admin/products/{productId}/status 연동
  };

  return (
    <main className='font-kakao-big-sans mx-auto max-w-6xl px-4 py-8'>
      <section className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>상품 등록 신청 관리</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            판매자가 등록 요청한 상품을 검토하고 승인/반려할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 상단 요약 카드 */}
      <section className='mb-8 grid gap-4 sm:grid-cols-4'>
        <SummaryCard
          label='전체 신청'
          value={`${totalCount}건`}
        />
        <SummaryCard
          label='승인 대기'
          value={`${pendingCount}건`}
        />
        <SummaryCard
          label='승인 완료'
          value={`${approvedCount}건`}
        />
        <SummaryCard
          label='반려 처리'
          value={`${rejectedCount}건`}
        />
      </section>

      {/* 목록 테이블 */}
      <section className='bg-card rounded-2xl border'>
        <div className='text-muted-foreground grid grid-cols-12 border-b px-4 py-3 text-xs font-medium'>
          <div className='col-span-4'>상품 정보</div>
          <div className='col-span-3'>판매자 정보</div>
          <div className='col-span-2 text-right'>판매가</div>
          <div className='col-span-1 text-center'>상태</div>
          <div className='col-span-2 text-right'>관리</div>
        </div>

        {products.length === 0 && (
          <div className='text-muted-foreground px-4 py-10 text-center text-sm'>
            현재 승인 대기 중인 상품 등록 신청이 없습니다.
          </div>
        )}

        {products.length > 0 && (
          <div className='divide-y'>
            {products.map((product) => (
              <AdminProductRow
                key={product.id}
                product={product}
                onUpdateStatus={handleUpdateStatus}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function SummaryCard({ label, value }) {
  return (
    <Card className='rounded-2xl'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-muted-foreground text-xs'>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xl font-bold'>{value}</div>
      </CardContent>
    </Card>
  );
}

function AdminProductRow({ product, onUpdateStatus, formatPrice }) {
  const { id, name, categoryName, sellerName, sellerGrade, price, submittedAt, status } = product;

  const statusLabelMap = {
    PENDING: '승인 대기',
    APPROVED: '승인 완료',
    REJECTED: '반려',
  };

  const statusVariantMap = {
    PENDING: 'outline',
    APPROVED: 'default',
    REJECTED: 'destructive',
  };

  const statusLabel = statusLabelMap[status] || status;
  const badgeVariant = statusVariantMap[status] || 'outline';

  const isPending = status === 'PENDING';

  return (
    <div className='grid grid-cols-12 items-center px-4 py-3 text-sm'>
      {/* 상품 정보 */}
      <div className='col-span-4 min-w-0'>
        <div className='truncate font-medium'>{name}</div>
        <div className='text-muted-foreground text-xs'>{categoryName}</div>
        <div className='text-muted-foreground text-[11px]'>신청일: {submittedAt}</div>
      </div>

      {/* 판매자 정보 */}
      <div className='col-span-3 min-w-0'>
        <div className='truncate text-sm'>{sellerName}</div>
        <div className='text-muted-foreground text-xs'>등급: {sellerGrade}</div>
      </div>

      {/* 가격 */}
      <div className='col-span-2 text-right tabular-nums'>{formatPrice(price)}원</div>

      {/* 상태 */}
      <div className='col-span-1 text-center'>
        <Badge variant={badgeVariant}>{statusLabel}</Badge>
      </div>

      {/* 관리 버튼 */}
      <div className='col-span-2 flex justify-end gap-2'>
        <Button
          size='sm'
          variant='outline'
          disabled={!isPending}
          onClick={() => onUpdateStatus(id, 'APPROVED')}
        >
          승인
        </Button>
        <Button
          size='sm'
          variant='outline'
          className='text-red-500'
          disabled={!isPending}
          onClick={() => onUpdateStatus(id, 'REJECTED')}
        >
          반려
        </Button>
      </div>
    </div>
  );
}
