import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DefaultAddress({ defaultAddress, onEdit }) {
  if (!defaultAddress) {
    return <div className='p-5'>기본배송지가 설정되어 있지 않습니다.</div>;
  }

  return (
    <Card>
      <CardContent className='space-y-4 p-5'>
        <div className='flex justify-between'>
          <div className='space-y-2'>
            <p>
              <strong>배송지명:</strong> {defaultAddress.addressName}
            </p>
            <p>
              <strong>수령인:</strong> {defaultAddress.receiverName}
            </p>
            <p>
              <strong>주소:</strong> [{defaultAddress.receiverZipcode}]{' '}
              {defaultAddress.receiverAddr1} {defaultAddress.receiverAddr2}
            </p>
            <p>
              <strong>연락처:</strong> {defaultAddress.receiverPhone}
            </p>
          </div>

          <div className='flex items-center'>
            <Button
              variant='default'
              onClick={() => onEdit && onEdit(defaultAddress)}
            >
              수정
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
