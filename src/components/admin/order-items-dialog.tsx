import type { OrderItem } from '@/api/order/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface OrderItemsDialogProps {
  orderItems: OrderItem[];
}

export default function OrderItemsDialog({ orderItems }: OrderItemsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='border border-black bg-white text-black hover:text-white'>
          주문 상품 목록 보기
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>주문 상품 목록</DialogTitle>
        </DialogHeader>

        <Table className='mt-2 bg-white'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>상품 이미지</TableHead>
              <TableHead className='text-center'>상품명</TableHead>
              <TableHead className='text-center'>단가</TableHead>
              <TableHead className='text-center'>수량</TableHead>
              <TableHead className='text-center'>총 금액</TableHead>
              <TableHead className='text-center'>주문 아이템 ID</TableHead>
              <TableHead className='text-center'>상품 ID</TableHead>
              <TableHead className='text-center'>상태</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderItems.map((item) => (
              <TableRow key={item.orderItemId}>
                <TableCell className='text-center'>
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className='mx-auto h-12 w-12 object-cover'
                  />
                </TableCell>
                <TableCell className='text-center'>{item.productName}</TableCell>
                <TableCell className='text-center'>
                  {item.productPrice.toLocaleString()}원
                </TableCell>
                <TableCell className='text-center'>{item.productQuantity}</TableCell>
                <TableCell className='text-center'>
                  {item.productTotalPrice.toLocaleString()}원
                </TableCell>
                <TableCell className='text-center'>{item.orderItemId}</TableCell>
                <TableCell className='text-center'>{item.productId}</TableCell>
                <TableCell className='text-center'>{item.orderItemStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
