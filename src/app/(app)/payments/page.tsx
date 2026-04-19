'use client';

import { usePayments } from '@/hooks/usePayments';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fmtCurrency, fmtKm } from '@/lib/utils';
import { format } from 'date-fns';
import type { PaymentStatus } from '@/types';

function statusVariant(status: PaymentStatus) {
  if (status === 'paid') return 'lime';
  if (status === 'cancelled') return 'red';
  return 'blue';
}

export default function PaymentsPage() {
  const { data: payments, isLoading } = usePayments();

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold text-light">Payments</h1>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : payments && payments.length > 0 ? (
        <div className="space-y-3">
          {payments.map((p) => {
            const start = format(new Date(p.period_start), 'd MMM');
            const end = format(new Date(p.period_end), 'd MMM yyyy');
            return (
              <Card key={p.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-light">
                      {start} – {end}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{fmtKm(Number(p.total_km))} covered</p>
                    {p.reference && (
                      <p className="text-xs text-muted mt-0.5 font-mono">Ref: {p.reference}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-lg font-semibold text-lime">
                      {fmtCurrency(Number(p.total_amount))}
                    </p>
                    <Badge variant={statusVariant(p.status)}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                {p.paid_at && (
                  <p className="text-xs text-muted mt-2">
                    Paid {format(new Date(p.paid_at), 'd MMM yyyy, HH:mm')}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <p className="text-muted text-sm">No payments yet. They are generated weekly every Monday.</p>
        </Card>
      )}
    </div>
  );
}
