'use client';

import { useEarnings } from '@/hooks/useAnalytics';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { fmtCurrency, fmtKm } from '@/lib/utils';

export default function EarningsHistoryPage() {
  const { data: today } = useEarnings(1);
  const { data: week } = useEarnings(7);
  const { data: month } = useEarnings(30);

  const periods = [
    { label: 'Today', data: today },
    { label: 'Last 7 Days', data: week },
    { label: 'Last 30 Days', data: month },
  ];

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold text-light">Earnings Summary</h1>

      {periods.map(({ label, data }) => {
        const s = data?.summary;
        if (!s) return (
          <div key={label} className="h-24 rounded-xl bg-surface animate-pulse" />
        );
        const isProfit = s.earnings.netEarnings >= 0;
        return (
          <Card key={label}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
              <span className="text-xs text-muted">{s.deliveries} deliveries · {fmtKm(s.distance_km)}</span>
            </CardHeader>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted mb-0.5">Delivery Fees</p>
                <p className="font-semibold text-lime">{fmtCurrency(s.earnings.deliveryFeeGenerated)}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Total Costs</p>
                <p className="font-semibold text-red-400">{fmtCurrency(s.earnings.costs.total)}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Net Earnings</p>
                <p className={`font-semibold ${isProfit ? 'text-lime' : 'text-red-400'}`}>
                  {fmtCurrency(s.earnings.netEarnings)}
                  <span className="text-xs font-normal text-muted ml-1">({s.earnings.marginPct})</span>
                </p>
              </div>
            </div>
          </Card>
        );
      })}

      <p className="text-xs text-muted text-center pt-2">
        Earnings are calculated from delivery fees minus base pay, fuel, maintenance and platform commission.
      </p>
    </div>
  );
}
