import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmt(n: number, decimals = 2): string {
  return n.toLocaleString('en-NG', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtCurrency(n: number): string {
  return `₦${fmt(n)}`;
}

export function fmtKm(n: number): string {
  return `${fmt(n)} km`;
}
