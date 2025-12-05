// src/routes/_needAuth/seller/claims.jsx
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { ClaimStatusBadge } from '@/components/seller/claim-status-badge';
import { ClaimTypeBadge } from '@/components/seller/claim-type-badge';
import { SummaryCard } from '@/components/seller/summary-card';
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
// 임시 데이터(백엔드 연동 전 UI 확인용)
const mockRequests = [
  {
    id: 'CR-2024-001',
    type: '취소',
    orderNo: 'ORD-2024-0156',
    customerName: '김고객',
    productName: '무선 블루투스 이어폰',
    date: '2024-01-15',
    status: '접수',
    amount: 89000,
  },
  {
    id: 'RR-2024-002',
    type: '반품',
    orderNo: 'ORD-2024-0142',
    customerName: '이구매',
    productName: '스마트 워치',
    date: '2024-01-14',
    status: '처리중',
    amount: 159000,
  },
  {
    id: 'EX-2024-003',
    type: '교환',
    orderNo: 'ORD-2024-0138',
    customerName: '박교환',
    productName: '운동화 (사이즈 변경)',
    date: '2024-01-13',
    status: '완료',
    amount: 0,
  },
];

function SellerClaimsPage() {
  const [typeFilter, setTypeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedId, setSelectedId] = useState(mockRequests[0]?.id ?? null);

  const selectedRequest = mockRequests.find((r) => r.id === selectedId) ?? mockRequests[0];

  const filteredRequests = useMemo(
    () =>
      mockRequests.filter((r) => {
        if (typeFilter !== '전체' && r.type !== typeFilter) return false;
        if (statusFilter !== '전체' && r.status !== statusFilter) return false;
        if (
          keyword &&
          !`${r.id}${r.orderNo}${r.customerName}${r.productName}`
            .toLowerCase()
            .includes(keyword.toLowerCase())
        ) {
          return false;
        }
        return true;
      }),
    [typeFilter, statusFilter, keyword],
  );

  const pendingCount = mockRequests.filter(
    (r) => r.status === '접수' || r.status === '처리대기',
  ).length;
  const completedCount = mockRequests.filter((r) => r.status === '완료').length;
  const refundWaitingCount = mockRequests.filter(
    (r) => r.type !== '교환' && r.status !== '완료',
  ).length;

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6'>
      {/* 헤더 */}
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight text-slate-900'>
          취소/반품/교환 관리
        </h1>
        <p className='text-sm text-slate-500'>
          고객의 취소, 반품, 교환 요청을 확인하고 처리할 수 있습니다.
        </p>
      </header>

      {/* 상단 요약 카드 */}
      <section className='grid gap-4 md:grid-cols-3'>
        <SummaryCard
          label='대기 중인 요청'
          value={pendingCount}
          badgeClass='bg-amber-50 text-amber-700 border-amber-200'
        />
        <SummaryCard
          label='처리 완료'
          value={completedCount}
          badgeClass='bg-emerald-50 text-emerald-700 border-emerald-200'
        />
        <SummaryCard
          label='환불 대기'
          value={refundWaitingCount}
          badgeClass='bg-rose-50 text-rose-700 border-rose-200'
        />
      </section>

      {/* 요청 목록 + 검색 */}
      <Card className='border-slate-200 bg-white shadow-sm'>
        {/* 검색 영역 */}
        <CardHeader className='border-b border-slate-100 bg-slate-50 py-3'>
          <div className='space-y-3'>
            {/* 유형 / 상태 / 기간 */}
            <FieldGroup className='grid items-end gap-3 md:grid-cols-4'>
              <Field>
                <Label
                  htmlFor='filter-type'
                  className='text-xs font-medium text-slate-600'
                >
                  요청 유형
                </Label>
                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger
                    id='filter-type'
                    className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                  >
                    <SelectValue placeholder='전체' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='전체'>전체</SelectItem>
                    <SelectItem value='취소'>취소</SelectItem>
                    <SelectItem value='반품'>반품</SelectItem>
                    <SelectItem value='교환'>교환</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label
                  htmlFor='filter-status'
                  className='text-xs font-medium text-slate-600'
                >
                  처리 상태
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
                    <SelectItem value='접수'>접수</SelectItem>
                    <SelectItem value='처리중'>처리중</SelectItem>
                    <SelectItem value='완료'>완료</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label
                  htmlFor='date-from'
                  className='text-xs font-medium text-slate-600'
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

              <Field>
                <Label
                  htmlFor='date-to'
                  className='text-xs font-medium text-slate-600'
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
            </FieldGroup>

            {/* 검색어 + 검색 버튼 */}
            <FieldGroup className='flex flex-col gap-2 pt-1 md:flex-row md:items-end'>
              <Field className='flex-1'>
                <Label
                  htmlFor='keyword'
                  className='text-xs font-medium text-slate-600'
                >
                  검색어
                </Label>
                <Input
                  id='keyword'
                  placeholder='주문번호 / 고객명 / 상품명'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className='mt-1 h-9 bg-white text-sm text-slate-800'
                />
              </Field>

              <Button
                type='button'
                className='mt-1 h-9 bg-slate-900 px-6 text-xs font-medium text-slate-50 hover:bg-slate-800 md:mt-0'
              >
                검색
              </Button>
            </FieldGroup>
          </div>
        </CardHeader>

        {/* 목록 테이블 */}
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table className='text-xs md:text-sm'>
              <TableHeader className='border-b border-slate-100 bg-white'>
                <TableRow className='text-[11px] font-medium text-slate-500 md:text-xs'>
                  <TableHead className='px-4 py-2'>요청번호</TableHead>
                  <TableHead className='px-4 py-2'>유형</TableHead>
                  <TableHead className='px-4 py-2'>주문번호</TableHead>
                  <TableHead className='px-4 py-2'>고객명</TableHead>
                  <TableHead className='px-4 py-2'>상품명</TableHead>
                  <TableHead className='px-4 py-2'>요청일</TableHead>
                  <TableHead className='px-4 py-2'>상태</TableHead>
                  <TableHead className='px-4 py-2 text-right'>금액</TableHead>
                  <TableHead className='px-4 py-2 text-center'>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((r) => (
                  <TableRow
                    key={r.id}
                    className={`border-t border-slate-100 text-slate-700 hover:bg-slate-50 ${
                      r.id === selectedRequest?.id ? 'bg-slate-50' : ''
                    }`}
                  >
                    <TableCell className='px-4 py-2 align-middle text-[11px] text-blue-600 md:text-xs'>
                      {r.id}
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle'>
                      <ClaimTypeBadge type={r.type} />
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle text-[11px] md:text-xs'>
                      {r.orderNo}
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle text-[11px] md:text-xs'>
                      {r.customerName}
                    </TableCell>
                    <TableCell className='truncate px-4 py-2 align-middle md:max-w-[220px]'>
                      {r.productName}
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle text-[11px] md:text-xs'>
                      {r.date}
                    </TableCell>
                    <TableCell className='px-4 py-2 align-middle'>
                      <ClaimStatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className='px-4 py-2 text-right align-middle text-[11px] md:text-xs'>
                      {r.amount === 0 ? '₩0' : `₩${r.amount.toLocaleString('ko-KR')}`}
                    </TableCell>
                    <TableCell className='px-4 py-2 text-center align-middle'>
                      <Button
                        size='xs'
                        variant='outline'
                        className='h-7 rounded-md border-slate-300 bg-slate-50 px-3 text-[11px] text-slate-700 hover:bg-slate-100'
                        type='button'
                        onClick={() => setSelectedId(r.id)}
                      >
                        처리
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* 하단 페이지 정보 */}
        <CardFooter className='border-t border-slate-100 px-4 py-3 text-[11px] text-slate-500 md:text-xs'>
          <div className='flex w-full items-center justify-between gap-3'>
            <span>총 {mockRequests.length}건 중 1-10건 표시</span>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>

      {/* 하단: 좌측 처리 폼 */}
      <section className='grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]'>
        {/* 왼쪽: 요청 처리 폼 전체 */}
        <Card className='border-slate-200 bg-white shadow-sm'>
          <CardHeader>
            <CardTitle className='text-sm text-slate-800'>요청 처리 상세</CardTitle>
            <CardDescription className='text-xs text-slate-500'>
              선택한 요청의 기본 정보와 반송/환불 정보를 확인하고 처리하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-6 lg:grid-cols-2'>
              {/* 기본 정보 */}
              <div className='space-y-3'>
                <p className='text-xs font-medium text-slate-600'>기본 정보</p>
                <Card className='border-slate-200 bg-slate-50/70'>
                  <CardContent className='p-4'>
                    <FieldGroup className='grid gap-4'>
                      <Field>
                        <Label
                          htmlFor='request-id'
                          className='text-xs font-medium text-slate-600'
                        >
                          요청번호
                        </Label>
                        <Input
                          id='request-id'
                          value={selectedRequest?.id ?? ''}
                          readOnly
                          className='mt-1 h-9 bg-white text-sm text-slate-800'
                        />
                      </Field>

                      <Field>
                        <Label
                          htmlFor='request-type'
                          className='text-xs font-medium text-slate-600'
                        >
                          요청 유형
                        </Label>
                        <Select defaultValue={selectedRequest?.type}>
                          <SelectTrigger
                            id='request-type'
                            className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='취소'>취소</SelectItem>
                            <SelectItem value='반품'>반품</SelectItem>
                            <SelectItem value='교환'>교환</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field>
                        <Label
                          htmlFor='request-status'
                          className='text-xs font-medium text-slate-600'
                        >
                          처리 상태
                        </Label>
                        <Select defaultValue={selectedRequest?.status}>
                          <SelectTrigger
                            id='request-status'
                            className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='접수'>접수</SelectItem>
                            <SelectItem value='처리중'>처리중</SelectItem>
                            <SelectItem value='완료'>완료</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field>
                        <Label
                          htmlFor='request-order'
                          className='text-xs font-medium text-slate-600'
                        >
                          주문번호
                        </Label>
                        <Input
                          id='request-order'
                          value={selectedRequest?.orderNo ?? ''}
                          readOnly
                          className='mt-1 h-9 bg-white text-sm text-slate-800'
                        />
                      </Field>

                      <Field>
                        <Label
                          htmlFor='request-customer'
                          className='text-xs font-medium text-slate-600'
                        >
                          고객명
                        </Label>
                        <Input
                          id='request-customer'
                          value={selectedRequest?.customerName ?? ''}
                          readOnly
                          className='mt-1 h-9 bg-white text-sm text-slate-800'
                        />
                      </Field>
                    </FieldGroup>
                  </CardContent>
                </Card>
              </div>

              {/* 반송 / 환불 정보 */}
              <div className='space-y-3'>
                <p className='text-xs font-medium text-slate-600'>반송/환불 정보</p>
                <Card className='border-slate-200 bg-slate-50/70'>
                  <CardContent className='p-4'>
                    <FieldGroup className='grid gap-4'>
                      <Field>
                        <Label
                          htmlFor='return-reason'
                          className='text-xs font-medium text-slate-600'
                        >
                          반송 사유
                        </Label>
                        <Select defaultValue='단순 변심'>
                          <SelectTrigger
                            id='return-reason'
                            className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='단순 변심'>단순 변심</SelectItem>
                            <SelectItem value='상품 불량/하자'>상품 불량/하자</SelectItem>
                            <SelectItem value='배송 문제'>배송 문제</SelectItem>
                            <SelectItem value='기타'>기타</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field>
                        <Label
                          htmlFor='refund-amount'
                          className='text-xs font-medium text-slate-600'
                        >
                          환불 금액
                        </Label>
                        <Input
                          id='refund-amount'
                          type='text'
                          defaultValue={
                            selectedRequest?.amount
                              ? `₩${selectedRequest.amount.toLocaleString(`ko-KR`)}`
                              : '₩0'
                          }
                          className='mt-1 h-9 bg-white text-sm text-slate-800'
                        />
                      </Field>

                      <Field>
                        <Label
                          htmlFor='refund-method'
                          className='text-xs font-medium text-slate-600'
                        >
                          환불 방법
                        </Label>
                        <Select defaultValue='원결제수단 취소'>
                          <SelectTrigger
                            id='refund-method'
                            className='mt-1 h-9 border-slate-200 bg-white text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='원결제수단 취소'>원결제수단 취소</SelectItem>
                            <SelectItem value='적립금 환불'>적립금 환불</SelectItem>
                            <SelectItem value='계좌이체 환불'>계좌이체 환불</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    </FieldGroup>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 메모 */}
            <div>
              <Label
                htmlFor='request-memo'
                className='text-xs font-medium text-slate-600'
              >
                처리 메모
              </Label>
              <Textarea
                id='request-memo'
                rows={3}
                placeholder='처리 과정에서 특이사항이나 메모를 입력해주세요.'
                className='mt-1 w-full resize-none border border-slate-200 bg-slate-50 text-sm text-slate-800 focus-visible:border-slate-400 focus-visible:ring-slate-400'
              />
            </div>
          </CardContent>
        </Card>

        {/*  알림 설정 + 액션 버튼  */}
        <div className='flex flex-col gap-4'>
          <Card className='border-slate-200 bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-xs font-medium text-slate-700'>알림 설정</CardTitle>
              <CardDescription className='text-xs text-slate-500'>
                처리 상태 변경 시 발송할 알림 채널을 선택하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2 text-xs text-slate-700'>
              <label className='flex items-center gap-2'>
                <Checkbox
                  defaultChecked
                  id='notify-all'
                />
                <span>알림 사용</span>
              </label>
              <label className='flex items-center gap-2'>
                <Checkbox
                  defaultChecked
                  id='notify-kakao'
                />
                <span>카카오톡 알림 발송</span>
              </label>
              <label className='flex items-center gap-2'>
                <Checkbox
                  defaultChecked
                  id='notify-email'
                />
                <span>이메일 알림 발송</span>
              </label>
              <label className='flex items-center gap-2'>
                <Checkbox id='notify-sms' />
                <span>SMS 알림 발송</span>
              </label>
            </CardContent>
          </Card>

          <Card className='border-slate-200 bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-xs font-medium text-slate-700'>요청 처리</CardTitle>
              <CardDescription className='text-xs text-slate-500'>
                입력한 정보로 요청을 저장하거나 즉시 처리 완료할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className='mt-2 flex flex-col gap-2'>
              <Button
                type='button'
                className='h-9 bg-slate-900 text-xs font-medium text-slate-50 hover:bg-slate-800'
              >
                수정 내용 저장
              </Button>
              <Button
                type='button'
                className='h-9 bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-500'
              >
                처리 완료
              </Button>
              <Button
                type='button'
                variant='outline'
                className='mt-1 h-9 border-slate-300 bg-slate-50 text-xs text-slate-700 hover:bg-slate-100'
              >
                취소
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/_need-auth/_seller/seller/claims')({
  component: SellerClaimsPage,
});
