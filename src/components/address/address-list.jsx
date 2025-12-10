import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AddressList({ addresses = [], onEdit, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center font-bold'>배송지명</TableHead>
              <TableHead className='text-center font-bold'>수령인</TableHead>
              <TableHead className='text-center font-bold'>주소</TableHead>
              <TableHead className='text-center font-bold'>연락처</TableHead>
              <TableHead className='text-center font-bold'></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {addresses.map((addr) => (
              <TableRow key={addr.addressId}>
                <TableCell className='px-4 py-4 text-center'>
                  <div className='flex flex-2 flex-col'>
                    {addr.isDefault && <span className='text-blue-500'>[기본배송지]</span>}
                    <span>{addr.addressName}</span>
                  </div>
                </TableCell>
                <TableCell className='px-4 py-4 text-center'>{addr.receiverName}</TableCell>
                <TableCell className='px-4 py-4 text-left'>
                  [{addr.receiverZipcode}]<br /> {addr.receiverAddr1}
                  <br /> ({addr.receiverAddr2})
                </TableCell>
                <TableCell className='px-4 py-4 text-center'>{addr.receiverPhone}</TableCell>
                <TableCell className='px-4 py-4 text-center'>
                  <div className='flex gap-1'>
                    <Button
                      onClick={() => onEdit && onEdit(addr)}
                      variant='default'
                      className='font-bold'
                    >
                      수정
                    </Button>
                    <Button
                      onClick={() => onDelete && onDelete(addr.addressId)}
                      variant='outline'
                      className='font-bold'
                    >
                      삭제
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
