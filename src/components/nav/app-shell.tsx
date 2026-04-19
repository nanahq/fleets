import { Sidebar } from './sidebar';
import { BottomTabs } from './bottom-tabs';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>
      <BottomTabs />
    </div>
  );
}
