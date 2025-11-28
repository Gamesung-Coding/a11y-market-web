// src/components/seller/summary-card.jsx
import { Card } from '@/components/ui/card';

export function SummaryCard({ label, value, badgeClass = '' }) {
  return (
    <Card className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm'>
      <div className='flex flex-col'>
        <span className='text-xs font-medium text-slate-500'>{label}</span>
        <span className='mt-3 text-xl font-semibold text-slate-900'>{value}</span>
      </div>
      <div
        className={`absolute top-1/2 right-6 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-semibold ${badgeClass} `}
      >
        {value}
      </div>
    </Card>
  );
}
