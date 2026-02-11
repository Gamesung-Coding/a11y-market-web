import { createFileRoute } from '@tanstack/react-router';
import { Fragment, useState } from 'react';

import type { AdminOrderSearchParams } from '@/api/admin/types';
import type { OrderItem } from '@/api/order/types';
import AdminOrdersFilter from '@/components/admin/admin-orders-filter';
import OrderItemsDialog from '@/components/admin/order-items-dialog';

import { useAdminOrders } from '@/api/admin/queries';
import { useUpdateOrderItemStatus } from '@/api/seller/mutations';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

export const Route = createFileRoute('/_need-auth/_admin/admin/orders')({
  component: RouteComponent,
});

const ORDER_STATUS_LABELS: Record<string, string> = {
  ORDERED: '주문접수',
  PAID: '결제완료',
  ACCEPTED: '주문승인',
  REJECTED: '주문거부',
  SHIPPED: '배송중',
  CONFIRMED: '배송완료',
  CANCEL_PENDING: '취소요청',
  CANCELED: '주문취소',
  CANCEL_REJECTED: '취소거부',
  RETURN_PENDING: '반품요청',
  RETURNED: '반품완료',
  RETURN_REJECTED: '반품거부',
};

function formatDateOnly(date: Date | undefined): string {
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

function getRepresentativeStatus(orderItems: OrderItem[] = []): string {
  if (!orderItems.length) return '';
  return orderItems[0]?.orderItemStatus ?? '';
}

function RouteComponent() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [orderStatusDraft, setOrderStatusDraft] = useState<Record<number, string>>({});
  const [currentFilter, setCurrentFilter] = useState<AdminOrderSearchParams>({
    searchType: '',
    keyword: '',
    startDate: '',
    endDate: '',
  });

  const { data: orders = [], isLoading: loading, error } = useAdminOrders(currentFilter);

  const { mutateAsync: updateOrderItemStatus } = useUpdateOrderItemStatus();

  const toggleRow = (orderId: number) => {
    setExpandedRows((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId],
    );
  };

  const buildSearchParams = (filter: AdminOrderSearchParams): AdminOrderSearchParams => {
    if (!filter) return { searchType: '', keyword: '', startDate: '', endDate: '' };

    const { searchType, keyword, startDate, endDate } = filter;

    return {
      searchType,
      keyword,
      startDate: formatDateOnly(new Date(startDate)),
      endDate: formatDateOnly(new Date(endDate)),
    };
  };

  const handleFilterChange = (filter: AdminOrderSearchParams) => {
    setCurrentFilter(buildSearchParams(filter));
  };

  const handleOrderStatusChange = (orderId: number, newStatus: string) => {
    setOrderStatusDraft((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleSave = async (orderId: number) => {
    const targetOrder = orders.find((o) => o.orderId === orderId);
    if (!targetOrder) {
      toast.error('주문 정보를 찾을 수 없습니다.');
      return;
    }

    const newStatus = orderStatusDraft[orderId];
    if (!newStatus) {
      toast.error('변경할 주문 상태를 선택해 주세요.');
      return;
    }

    if (!targetOrder.items || targetOrder.items.length === 0) {
      toast.error('변경할 주문 항목이 없습니다.');
      return;
    }

    try {
      await Promise.all(
        targetOrder.items.map((item) =>
          updateOrderItemStatus({ orderItemId: item.orderItemId, status: newStatus }),
        ),
      );

      toast.success('주문 상태가 저장되었습니다.');
    } catch (err) {
      console.error('주문 상태 저장 실패:', err);
      toast.error('주문 상태 저장 중 오류가 발생했습니다.');
    }
  };

  const handleReset = (orderId: number) => {
    const targetOrder = orders.find((o) => o.orderId === orderId);
    const rep = targetOrder ? getRepresentativeStatus(targetOrder.items) : '';

    setOrderStatusDraft((prev) => {
      const next = { ...prev };
      if (rep) {
        next[orderId] = rep;
      } else {
        delete next[orderId];
      }
      return next;
    });
  };

  return (
    <div className='max-w-8xl mx-auto w-full px-4 pt-4'>
      <div className='mb-6 text-center text-3xl font-semibold'>주문 관리</div>

      <h3 className='my-6 text-center'>
        주문 상태, 기간 등을 기준으로 주문을 조회하고 관리할 수 있습니다.
      </h3>

      <AdminOrdersFilter onFilterChange={handleFilterChange} />

      {error && (
        <div className='border-destructive/40 bg-destructive/5 text-destructive mb-3 rounded-xl border px-4 py-3 text-sm'>
          {error.message}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>주문자명</TableHead>
            <TableHead className='text-center'>주문번호</TableHead>
            <TableHead className='text-center'>주문일</TableHead>
            <TableHead className='text-center'>주문상태</TableHead>
            <TableHead className='text-center'></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading && (
            <TableRow>
              <TableCell
                colSpan={5}
                className='text-muted-foreground py-6 text-center text-sm'
              >
                주문 목록을 불러오는 중입니다...
              </TableCell>
            </TableRow>
          )}

          {!loading && orders.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className='text-muted-foreground py-6 text-center text-sm'
              >
                조회된 주문이 없습니다.
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            orders.map((order) => {
              const representativeStatus = getRepresentativeStatus(order.items);
              const selectedStatus = orderStatusDraft[order.orderId] || representativeStatus || '';
              const statusLabel =
                selectedStatus && ORDER_STATUS_LABELS[selectedStatus]
                  ? ORDER_STATUS_LABELS[selectedStatus]
                  : selectedStatus || '상태 없음';

              return (
                <Fragment key={order.orderId}>
                  <TableRow
                    className='cursor-pointer hover:bg-gray-100'
                    onClick={() => toggleRow(order.orderId)}
                  >
                    <TableCell className='text-center'>{order.userName}</TableCell>
                    <TableCell className='text-center'>{order.orderId}</TableCell>
                    <TableCell className='text-center'>
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}
                    </TableCell>
                    <TableCell className='text-center'>
                      <div className='mt-2 flex justify-center gap-2'>
                        <Select
                          value={selectedStatus}
                          onValueChange={(val) => handleOrderStatusChange(order.orderId, val)}
                          disabled={!order.items || order.items.length === 0}
                        >
                          <SelectTrigger className='w-36'>{statusLabel}</SelectTrigger>
                          <SelectContent>
                            <SelectItem value='ORDERED'>{ORDER_STATUS_LABELS.ORDERED}</SelectItem>
                            <SelectItem value='PAID'>{ORDER_STATUS_LABELS.PAID}</SelectItem>
                            <SelectItem value='ACCEPTED'>{ORDER_STATUS_LABELS.ACCEPTED}</SelectItem>
                            <SelectItem value='REJECTED'>{ORDER_STATUS_LABELS.REJECTED}</SelectItem>
                            <SelectItem value='SHIPPED'>{ORDER_STATUS_LABELS.SHIPPED}</SelectItem>
                            <SelectItem value='CONFIRMED'>
                              {ORDER_STATUS_LABELS.CONFIRMED}
                            </SelectItem>
                            <SelectItem value='CANCELED'>{ORDER_STATUS_LABELS.CANCELED}</SelectItem>
                            <SelectItem value='RETURNED'>{ORDER_STATUS_LABELS.RETURNED}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell className='text-center'>
                      <div className='mt-2 flex justify-center gap-2'>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(order.orderId);
                          }}
                        >
                          저장
                        </Button>
                        <Button
                          className='border border-black bg-white text-black hover:text-white'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReset(order.orderId);
                          }}
                        >
                          초기화
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedRows.includes(order.orderId) && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='bg-gray-100 p-4'
                      >
                        <div className='space-y-2'>
                          <div className='flex gap-2'>
                            <dt className='font-semibold'>수령인:</dt>
                            <dd>{order.receiverName}</dd>
                          </div>
                          <div className='flex gap-2'>
                            <dt className='font-semibold'>주문자 전화번호:</dt>
                            <dd>{order.userPhone}</dd>
                          </div>
                          <div className='flex gap-2'>
                            <dt className='font-semibold'>수령인 전화번호:</dt>
                            <dd>{order.receiverPhone}</dd>
                          </div>
                          <div className='flex gap-2'>
                            <dt className='font-semibold'>배송지 주소:</dt>
                            <dd>{`${order.receiverZipcode ?? ''} ${order.receiverAddr1 ?? ''} ${
                              order.receiverAddr2 ?? ''
                            }`}</dd>
                          </div>
                          <div className='flex items-center justify-between gap-2'>
                            <div className='flex gap-2'>
                              <dt className='font-semibold'>총 결제 금액:</dt>
                              <dd>{order.totalPrice?.toLocaleString('ko-KR')}원</dd>
                            </div>
                            <OrderItemsDialog orderItems={order.items ?? []} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
