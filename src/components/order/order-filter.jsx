// components/order/OrderFilterBar.jsx

import { Card, CardContent } from '../ui/card';

export default function OrderFilterBar({
  statusFilter,
  setStatusFilter,
  sortType,
  setSortType,
  searchKeyword,
  SetSearchKeyword,
  startDate,
  SetStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <Card>
      <CardContent
        className='space-y-6'
        py-6
      >
        {}
      </CardContent>
    </Card>
  );
}
