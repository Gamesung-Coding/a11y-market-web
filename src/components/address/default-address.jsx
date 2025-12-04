import { Button } from '@/components/ui/button'

export default function DefaultAddress({ defaultAddress, onEdit }) {
  if (!defaultAddress) {
    return <div className="p-5">기본배송지가 설정되어 있지 않습니다.</div>
  }

  return (
    <div className="flex justify-between items-center border border-gray-300 rounded-md p-5">
      <div className="text-left space-y-1">
        <p><strong>배송지명:</strong> {defaultAddress.addressName}</p>
        <p><strong>수령인:</strong> {defaultAddress.receiverName}</p>
        <p>
          <strong>주소:</strong> ({defaultAddress.zipcord}) {defaultAddress.address1} {defaultAddress.address2}
        </p>
        <p><strong>연락처:</strong> {defaultAddress.phone}</p>
      </div>

      <div>
        <Button onClick={() => onEdit && onEdit(defaultAddress)}>수정</Button>
      </div>
    </div>
  )
}
