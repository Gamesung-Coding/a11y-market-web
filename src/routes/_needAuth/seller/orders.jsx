// src/routes/_needAuth/seller/orders.jsx
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import {
    InfoRow,
    OrderStatusBadge,
    OrderSummaryCard,
} from '@/components/seller/order-summary-section';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

// 임시 주문 데이터 (백엔드 연동 전 UI 확인용)
const mockOrders = [
  {
    id: 'ORD-2024-0156',
    date: '2024-01-15',
    buyerName: '김주문',
    itemSummary: '무선 블루투스 이어폰 외 1개',
    amount: 89000,
    status: '주문접수', // 주문접수 / 상품준비중 / 배송중 / 배송완료 / 취소
  },
  {
    id: 'ORD-2024-0142',
    date: '2024-01-14',
    buyerName: '이배송',
    itemSummary: '스마트 워치',
    amount: 159000,
    status: '상품준비중',
  },
  {
    id: 'ORD-2024-0138',
    date: '2024-01-13',
    buyerName: '박완료',
    itemSummary: '운동화 (270mm)',
    amount: 129000,
    status: '배송완료',
  },
];

function SellerOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('전체');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(mockOrders[0]?.id ?? null);

  const selectedOrder = mockOrders.find((o) => o.id === selectedOrderId) ?? mockOrders[0];

  const filteredOrders = useMemo(
    () =>
      mockOrders.filter((o) => {
        if (statusFilter !== '전체' && o.status !== statusFilter) return false;

        if (
          keyword &&
          !`${o.id}${o.buyerName}${o.itemSummary}`.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return false;
        }

        // 날짜 필터는 UI만 우선 구현 (추후 실제 비교 로직 추가 가능)
        return true;
      }),
    [statusFilter, keyword],
  );

  const newOrderCount = mockOrders.filter((o) => o.status === '주문접수').length;
  const preparingCount = mockOrders.filter((o) => o.status === '상품준비중').length;
  const shippingCount = mockOrders.filter((o) => o.status === '배송중').length;
  const completedCount = mockOrders.filter((o) => o.status === '배송완료').length;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    // TODO: 추후 배송 정보 저장 / 상태 변경 API 연동
  };

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6'>
      {/* 헤더 */}
      <header className='space-y-1'>
        <h1 className='font-kakao-big text-2xl text-slate-900'>주문 접수 / 배송 처리</h1>
        <p className='font-kakao-little text-sm text-slate-500'>
          접수된 주문을 확인하고, 상품 준비 및 배송 정보를 관리할 수 있습니다.
        </p>
      </header>

      {/* 상단 요약 카드 */}
      <section className='grid gap-4 md:grid-cols-4'>
        <OrderSummaryCard
          label='신규 주문'
          value={newOrderCount}
          description='주문접수 상태의 주문 수'
        />
        <OrderSummaryCard
          label='상품 준비 중'
          value={preparingCount}
          description='포장/출고 준비 중인 주문 수'
        />
        <OrderSummaryCard
          label='배송 중'
          value={shippingCount}
          description='택배사에 전달된 배송 건'
        />
        <OrderSummaryCard
          label='배송 완료'
          value={completedCount}
          description='배송이 완료된 주문 수'
        />
      </section>

      {/* 주문 목록 + 검색 */}
      <Card className='border-slate-200 bg-white shadow-sm'>
        {/* 검색 영역 */}
        <CardHeader className='border-b border-slate-100 bg-slate-50 py-3'>
          <div className='space-y-3'>
            <FieldGroup className='grid items-end gap-3 md:grid-cols-4'>
              {/* 주문 상태 필터 */}
              <Field>
                <Label
                  htmlFor='filter-status'
                  className='font-kakao-little text-xs font-medium text-slate-600'
                >
                  주문 상태
                </Label>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger
                    id='filter-status'
                    className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                  >
                    <SelectValue placeholder='전체' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='전체'>전체</SelectItem>
                    <SelectItem value='주문접수'>주문접수</SelectItem>
                    <SelectItem value='상품준비중'>상품준비중</SelectItem>
                    <SelectItem value='배송중'>배송중</SelectItem>
                    <SelectItem value='배송완료'>배송완료</SelectItem>
                    <SelectItem value='취소'>취소</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* 기간(시작) */}
              <Field>
                <Label
                  htmlFor='date-from'
                  className='font-kakao-little text-xs font-medium text-slate-600'
                >
                  기간 설정 (시작)
                </Label>
                <Input
                  id='date-from'
                  type='date'
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className='mt-1 h-9 bg-white text-sm text-slate-800'
                />
              </Field>

              {/* 기간(종료) */}
              <Field>
                <Label
                  htmlFor='date-to'
                  className='font-kakao-little text-xs font-medium text-slate-600'
                >
                  기간 설정 (종료)
                </Label>
                <Input
                  id='date-to'
                  type='date'
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className='mt-1 h-9 bg-white text-sm text-slate-800'
                />
              </Field>

              {/* 검색어 */}
              <Field>
                <Label
                  htmlFor='order-keyword'
                  className='font-kakao-little text-xs font-medium text-slate-600'
                >
                  주문 검색
                </Label>
                <div className='mt-1 flex gap-2'>
                  <Input
                    id='order-keyword'
                    placeholder='주문번호 / 주문자명 / 상품명'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className='h-9 flex-1 bg-white text-sm text-slate-800'
                  />
                  <Button
                    type='button'
                    className='font-kakao-little h-9 bg-slate-900 px-4 text-xs text-slate-50 hover:bg-slate-800'
                  >
                    검색
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </div>
        </CardHeader>

        {/* 주문 목록 테이블 */}
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table className='text-xs md:text-sm'>
              <TableHeader className='border-b border-slate-100 bg-white'>
                <TableRow className='font-kakao-little text-[11px] font-medium text-slate-500 md:text-xs'>
                  <TableHead className='px-4 py-2'>주문번호</TableHead>
                  <TableHead className='px-4 py-2'>주문일</TableHead>
                  <TableHead className='px-4 py-2'>주문자</TableHead>
                  <TableHead className='px-4 py-2'>주문 상품</TableHead>
                  <TableHead className='px-4 py-2 text-right'>결제 금액</TableHead>
                  <TableHead className='px-4 py-2'>상태</TableHead>
                  <TableHead className='px-4 py-2 text-center'>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((o) => (
                  <TableRow
                    key={o.id}
                    className={`border-t border-slate-100 text-slate-700 hover:bg-slate-50 ${
                      o.id === selectedOrder?.id ? 'bg-slate-50' : ''
                    }`}
                  >
                    <TableCell className='px-4 py-2 align-middle text-[11px] text-blue-600 md:text-xs'>
                      {o.id}
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle text-[11px] md:text-xs'>
                      {o.date}
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle text-[11px] md:text-xs'>
                      {o.buyerName}
                    </TableCell>
                    <TableCell className='truncate px-4 py-2 align-middle md:max-w-[260px]'>
                      {o.itemSummary}
                    </TableCell>
                    <TableCell className='px-4 py-2 text-right align-middle text-[11px] md:text-xs'>
                      ₩{o.amount.toLocaleString('ko-KR')}
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle'>
                      <OrderStatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className='px-4 py-2 text-center align-middle'>
                      <Button
                        size='xs'
                        variant='outline'
                        className='h-7 rounded-md border-slate-300 bg-slate-50 px-3 text-[11px] text-slate-700 hover:bg-slate-100'
                        type='button'
                        onClick={() => setSelectedOrderId(o.id)}
                      >
                        상세
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* 하단 Pagination – 아직 기능 없이 UI만 */}
        <CardFooter className='border-t border-slate-100 px-4 py-3'>
          <div className='flex w-full items-center justify-between text-[11px] text-slate-500 md:text-xs'>
            <span>총 {mockOrders.length}건 중 1-10건 표시</span>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href='#' />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    isActive
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#'>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href='#' />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>

      {/* 하단: 주문 상세 + 배송 처리 */}
      <section className='space-y-4'>
        {/* 섹션 헤더 */}
        <div className='flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between'>
          <h2 className='font-kakao-little text-sm font-semibold text-slate-900'>
            주문 / 배송 처리 상세
          </h2>
          <p className='font-kakao-little text-xs text-slate-500'>
            선택한 주문의 기본 정보와 배송 상태, 송장 정보를 한 번에 관리합니다.
          </p>
        </div>

        {/* 좌: 주문 정보 / 우: 배송 처리 */}
        <div className='grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]'>
          {/* 왼쪽: 주문 기본 정보 카드 */}
          <Card className='border-slate-200 bg-white shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='font-kakao-little text-sm text-slate-900'>
                주문 기본 정보
              </CardTitle>
              <CardDescription className='font-kakao-little text-xs text-slate-500'>
                결제 금액과 주문자, 주문 상품 정보를 확인할 수 있습니다.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-4'>
              {/* 주문 정보 박스 */}
              <div className='space-y-2 rounded-lg border border-slate-200 bg-slate-50/80 p-4'>
                <InfoRow
                  label='주문번호'
                  value={selectedOrder?.id ?? '-'}
                />
                <InfoRow
                  label='주문일'
                  value={selectedOrder?.date ?? '-'}
                />
                <InfoRow
                  label='주문자'
                  value={selectedOrder?.buyerName ?? '-'}
                />
                <InfoRow
                  label='주문 상품'
                  value={selectedOrder?.itemSummary ?? '-'}
                />
                <InfoRow
                  label='결제 금액'
                  value={selectedOrder ? `₩${selectedOrder.amount.toLocaleString('ko-KR')}` : '-'}
                />
              </div>

              {/* 상태 요약 박스 */}
              <div className='flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3'>
                <div className='space-y-0.5'>
                  <p className='font-kakao-little text-xs font-medium text-slate-700'>
                    현재 주문 상태
                  </p>
                  <p className='font-kakao-little text-[11px] text-slate-500'>
                    주문의 진행 상황을 확인하고 우측에서 배송 상태를 변경할 수 있습니다.
                  </p>
                </div>
                <OrderStatusBadge status={selectedOrder?.status ?? '주문접수'} />
              </div>
            </CardContent>
          </Card>

          {/* 오른쪽: 배송 처리 카드 */}
          <Card className='border-slate-200 bg-white shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='font-kakao-little text-sm text-slate-900'>배송 처리</CardTitle>
              <CardDescription className='font-kakao-little text-xs text-slate-500'>
                배송 상태, 택배사, 송장번호를 입력하고 알림 발송 여부를 설정할 수 있습니다.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                className='space-y-4'
                onSubmit={handleShippingSubmit}
              >
                <FieldGroup className='grid gap-4'>
                  {/* 배송 상태 */}
                  <Field>
                    <Label
                      htmlFor='shipping-status'
                      className='font-kakao-little text-xs font-medium text-slate-600'
                    >
                      배송 상태
                    </Label>
                    <Select defaultValue={selectedOrder?.status ?? '주문접수'}>
                      <SelectTrigger
                        id='shipping-status'
                        className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='주문접수'>주문접수</SelectItem>
                        <SelectItem value='상품준비중'>상품준비중</SelectItem>
                        <SelectItem value='배송중'>배송중</SelectItem>
                        <SelectItem value='배송완료'>배송완료</SelectItem>
                        <SelectItem value='취소'>취소</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  {/* 택배사 */}
                  <Field>
                    <Label
                      htmlFor='shipping-carrier'
                      className='font-kakao-little text-xs font-medium text-slate-600'
                    >
                      택배사
                    </Label>
                    <Select defaultValue='CJ대한통운'>
                      <SelectTrigger
                        id='shipping-carrier'
                        className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                      >
                        <SelectValue placeholder='택배사를 선택하세요' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='CJ대한통운'>CJ대한통운</SelectItem>
                        <SelectItem value='롯데택배'>롯데택배</SelectItem>
                        <SelectItem value='한진택배'>한진택배</SelectItem>
                        <SelectItem value='우체국택배'>우체국택배</SelectItem>
                        <SelectItem value='기타'>기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  {/* 송장번호 */}
                  <Field>
                    <Label
                      htmlFor='tracking-number'
                      className='font-kakao-little text-xs font-medium text-slate-600'
                    >
                      송장번호
                    </Label>
                    <Input
                      id='tracking-number'
                      placeholder='배송 송장번호를 입력하세요'
                      className='mt-1 h-9 bg-white text-sm text-slate-800'
                    />
                  </Field>
                </FieldGroup>

                {/* 메모 */}
                <div>
                  <Label
                    htmlFor='shipping-memo'
                    className='font-kakao-little text-xs font-medium text-slate-600'
                  >
                    배송 메모
                  </Label>
                  <Textarea
                    id='shipping-memo'
                    rows={3}
                    placeholder='배송 관련 특이사항이나 참고 메모를 입력하세요.'
                    className='mt-1 w-full resize-none border border-slate-200 bg-slate-50 text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                  />
                </div>

                {/* 알림 설정 */}
                <div className='font-kakao-little space-y-2 pt-1 text-xs text-slate-700'>
                  <p className='font-medium text-slate-700'>알림 설정</p>
                  <label className='flex items-center gap-2'>
                    <Checkbox
                      defaultChecked
                      id='notify-order'
                    />
                    <span>배송 상태 변경 시 알림 발송</span>
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox
                      defaultChecked
                      id='notify-sms'
                    />
                    <span>SMS 알림 발송</span>
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox id='notify-email' />
                    <span>이메일 알림 발송</span>
                  </label>
                </div>

                {/* 버튼 */}
                <div className='mt-3 flex flex-col gap-2'>
                  <Button
                    type='submit'
                    className='font-kakao-little h-9 bg-slate-900 text-xs font-medium text-slate-50 hover:bg-slate-800'
                  >
                    배송 정보 저장
                  </Button>
                  <Button
                    type='button'
                    className='font-kakao-little h-9 bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-500'
                  >
                    배송 완료 처리
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    className='font-kakao-little mt-1 h-9 border-slate-300 bg-slate-50 text-xs text-slate-700 hover:bg-slate-100'
                  >
                    취소
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/_needAuth/seller/orders')({
  component: SellerOrdersPage,
});
