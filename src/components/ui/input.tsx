import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-lg border border-border bg-elevated px-3 text-sm text-light placeholder:text-muted',
        'focus:outline-none focus:ring-2 focus:ring-blue/50 focus:border-blue',
        'disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
