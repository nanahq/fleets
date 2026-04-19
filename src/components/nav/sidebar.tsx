'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { clearToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/bikes', label: 'Bikes', icon: '◎' },
  { href: '/map', label: 'Live Map', icon: '◉' },
  { href: '/payments', label: 'Payments', icon: '₦' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push('/login');
  }

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border bg-surface min-h-screen">
      <div className="px-5 py-6 border-b border-border">
        <span className="text-lime font-bold text-lg tracking-tight">nana fleets</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-elevated text-light font-medium'
                  : 'text-muted hover:text-light hover:bg-elevated/50',
              )}
            >
              <span className="w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-red-400 hover:bg-elevated/50 transition-colors"
        >
          <span className="w-4 text-center">⏻</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
