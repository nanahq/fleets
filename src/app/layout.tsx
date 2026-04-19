import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Nana Fleets',
  description: 'Fleet management portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: 'var(--elevated)',
                border: '1px solid var(--border)',
                color: 'var(--light)',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
