import type { OrderItem } from '@/api/order/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  item: OrderItem | null;
}

export default function CancelModal({ isOpen, onClose, onSubmit, item }: CancelModalProps) {
  const [reason, setReason] = useState('');
  const presetReasons = ['단순 변심', '사이즈/옵션 선택 실수', '상품 설명과 다름'];
  const [customMode, setCustomMode] = useState(false);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>주문 취소 요청</AlertDialogTitle>
          <AlertDialogDescription>상품 취소를 원하시는 사유를 입력해주세요.</AlertDialogDescription>
        </AlertDialogHeader>

        {item && (
          <div className='itmes-start flex gap-4'>
            <img
              src={item.productImageUrl || '/no-image.png'}
              alt={item.productName}
              className='h-24 w-24 rounded-md object-cover'
            />

            <div className='space-y-1'>
              <p>
                상품명: <span className='font-bold'>{item.productName}</span>
              </p>
              <p>
                수량: {item.productQuantity}개 / 금액:
                {(item.productPrice * item.productQuantity).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        <div className='mt-4 flex flex-wrap gap-2'>
          {presetReasons.map((text) => (
            <button
              key={text}
              type='button'
              className={`rounded-md border px-3 py-1 text-sm ${reason === text ? 'border-black bg-black text-white' : 'border-gray-300'}`}
              onClick={() => {
                setReason(text);
                setCustomMode(false);
              }}
            >
              {text}
            </button>
          ))}
          <button
            type='button'
            className={`rounded-md border px-3 py-1 text-sm ${customMode ? 'border-black bg-black text-white' : 'border-gray-700'} `}
            onClick={() => {
              setReason('');
              setCustomMode(true);
            }}
          >
            기타
          </button>
        </div>

        <Textarea
          placeholder='취소 사유를 입력해주세요.'
          className='mt-4 resize-none'
          rows={4}
          value={reason}
          disabled={!customMode}
          maxLength={49}
          onChange={(e) => setReason(e.target.value)}
        ></Textarea>
        <p className='mt-1 text-right text-gray-500'>{reason.length} / 50</p>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setReason('');
              onClose();
            }}
          >
            닫기
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={!reason.trim()}
            onClick={() => {
              onSubmit(reason);
              setReason('');
            }}
          >
            요청 보내기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
