import { Card } from './card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: 'lime' | 'blue' | 'purple' | 'light';
  className?: string;
}

export function StatCard({ label, value, sub, accent = 'light', className }: StatCardProps) {
  return (
    <Card className={cn('flex flex-col gap-1', className)}>
      <p className="text-xs font-medium text-muted uppercase tracking-wide">{label}</p>
      <p
        className={cn('text-2xl font-semibold tabular-nums', {
          'text-lime': accent === 'lime',
          'text-blue': accent === 'blue',
          'text-purple': accent === 'purple',
          'text-light': accent === 'light',
        })}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </Card>
  );
}
