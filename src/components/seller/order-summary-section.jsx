// src/components/seller/order-summary-section.jsx
import { Card } from '@/components/ui/card';

export function OrderSummaryCard({ label, value, description }) {
  return (
    <Card className='relative flex h-[120px] flex-col justify-between rounded-xl border px-5 py-3 shadow-sm'>
      {/* 위쪽: 라벨 + 설명 */}
      <div className='mt-1 space-y-1'>
        <p className='font-kakao-little text-sm font-medium'>{label}</p>
        {description && <p className='font-kakao-little text-sm'>{description}</p>}
      </div>

      {/* 아래쪽 숫자  */}
      <div className='pb-1'>
        <p className='text-lg leading-none font-bold'>{value}</p>
      </div>
    </Card>
  );
}

/** 주문 정보 행 */
export function InfoRow({ label, value }) {
  return (
    <div className='flex items-center justify-between gap-3 text-xs'>
      <span className='font-kakao-little text-sm text-slate-500'>{label}</span>
      <span className='font-kakao-little text-sm text-slate-800'>{value}</span>
    </div>
  );
}
