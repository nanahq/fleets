'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/bikes', label: 'Bikes', icon: '◎' },
  { href: '/map', label: 'Map', icon: '◉' },
  { href: '/payments', label: 'Payments', icon: '₦' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
];

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface">
      <div className="flex h-16">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-colors',
                active ? 'text-lime' : 'text-muted',
              )}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
