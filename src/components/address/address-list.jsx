import { Button } from '@/components/ui/button';

export default function AddressList({ addresses = [], onEdit, onDelete }) {
  return (
    <div className='rounded-md border border-gray-300 p-2'>
      <div className='flex border-b border-gray-300 py-2 font-bold'>
        <div className='flex-2'>배송지명</div>
        <div className='flex-1'>수령인</div>
        <div className='flex-3'>주소</div>
        <div className='flex-2'>연락처</div>
        <div className='flex-auto'>관리</div>
      </div>

      {addresses.map((addr) => (
        <div
          key={addr.id}
          className='flex items-center border-b border-gray-200 py-2'
        >
          <div className='flex flex-2 flex-col'>
            {addr.isDefault && <span className='text-blue-500'>[기본배송지]</span>}
            <span>{addr.addressName}</span>
          </div>
          <div className='flex-1'>{addr.receiverName}</div>
          <div className='flex-3'>
            ({addr.zipcord}) {addr.address1} {addr.address2}
          </div>
          <div className='flex-2'>{addr.phone}</div>
          <div className='flex gap-1'>
            <Button onClick={() => onEdit && onEdit(addr)}>수정</Button>
            <Button
              onClick={() => onDelete && onDelete(addr.id)}
              className='border border-black bg-white text-black hover:bg-gray-100'
            >
              삭제
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
