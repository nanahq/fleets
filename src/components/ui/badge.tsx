import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'lime' | 'blue' | 'purple' | 'red' | 'muted';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        {
          'bg-elevated text-light': variant === 'default',
          'bg-lime/10 text-lime': variant === 'lime',
          'bg-blue/10 text-blue': variant === 'blue',
          'bg-purple/10 text-purple': variant === 'purple',
          'bg-red-500/10 text-red-400': variant === 'red',
          'bg-elevated text-muted': variant === 'muted',
        },
        className,
      )}
      {...props}
    />
  );
}
