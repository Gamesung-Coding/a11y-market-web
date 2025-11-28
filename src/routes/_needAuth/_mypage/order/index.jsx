import { getMyOrders } from '@/api/order';
import OrderList from '@/components/order/OrderList';
import OrderPagination from '@/components/order/OrderPagination';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_needAuth/_mypage/order/')({
  component: OrderHistoryPage,
});

const ITEMS_PER_PAGE = 5;

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortType, setSortType] = useState('LATEST');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError('주문 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 페이지네이션
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <Card className='p-6'>
      <CardContent className='space-y-6'>
        <h1 className='text-2xl font-bold'>주문 내역</h1>

        {/* 필터/검색/정렬 */}

        {/* 로딩 상태 */}
        {loading && (
          <div className='space-y-4'>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <Skeleton
                key={i}
                className='h-[140px] w-full rounded-xl'
              />
            ))}
          </div>
        )}

        {/* 에러 상태 */}
        {error && <div className='py-10 text-center text-red-500'>{error}</div>}

        {/* 정상 상태 */}
        {!loading && !error && <OrderList orders={currentOrders} />}

        {/* 페이지네이션 */}
        {!loading && !error && orders.length > ITEMS_PER_PAGE && (
          <OrderPagination
            currentPage={currentPage}
            totalPages={Math.ceil(orders.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        )}
      </CardContent>
    </Card>
  );
}
