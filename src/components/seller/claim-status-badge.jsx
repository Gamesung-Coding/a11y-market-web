import { Badge } from '@/components/ui/badge';

export function ClaimStatusBadge({ status }) {
  const map = {
    접수: 'bg-amber-50 text-amber-700 border-amber-200',
    처리중: 'bg-sky-50 text-sky-700 border-sky-200',
    완료: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <Badge
      variant='outline'
      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
        map[status] ?? 'border-slate-200 bg-slate-50 text-slate-700'
      }`}
    >
      {status}
    </Badge>
  );
}
