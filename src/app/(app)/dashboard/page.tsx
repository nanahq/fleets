'use client';

import { useState } from 'react';
import { useAnalytics, useEod } from '@/hooks/useAnalytics';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fmtCurrency, fmtKm, fmt } from '@/lib/utils';
import type { AnalyticsWindow } from '@/types';

const WINDOWS: { label: string; value: AnalyticsWindow }[] = [
  { label: 'Today', value: 1 },
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
];

export default function DashboardPage() {
  const [window, setWindow] = useState<AnalyticsWindow>(7);
  const { data: analytics, isLoading: loadingAnalytics } = useAnalytics(window);
  const { data: eod } = useEod();

  const summary = analytics?.summary;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-light">Analytics</h1>
        <div className="flex gap-2">
          {WINDOWS.map((w) => (
            <Button
              key={w.value}
              size="sm"
              variant={window === w.value ? 'default' : 'outline'}
              onClick={() => setWindow(w.value)}
            >
              {w.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      {loadingAnalytics ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : summary ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <StatCard label="Deliveries" value={summary.deliveries} accent="light" />
          <StatCard label="Distance" value={fmtKm(summary.distance_km_total)} accent="purple" />
          <StatCard label="Revenue" value={fmtCurrency(summary.revenue_total)} accent="lime" />
          <StatCard
            label="Avg km / delivery"
            value={fmtKm(summary.avg_km_per_delivery)}
            accent="light"
          />
          <StatCard
            label="Deliveries / km"
            value={fmt(summary.avg_deliveries_per_km)}
            accent="light"
          />
          <StatCard
            label="Revenue / km"
            value={fmtCurrency(summary.avg_revenue_per_km)}
            accent="lime"
          />
        </div>
      ) : null}

      {/* EOD Today */}
      {eod && (
        <Card>
          <CardHeader>
            <CardTitle>Today's End-of-Day ({eod.date})</CardTitle>
            <span className="text-xs text-muted">
              {eod.revenue_model === 'FULL_SERVICE' ? 'Full service' : 'Bike only'} ·{' '}
              ₦{Number(eod.commission_rate)}/km commission
            </span>
          </CardHeader>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <p className="text-xs text-muted mb-0.5">Deliveries</p>
              <p className="text-lg font-semibold">{eod.deliveries}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">Distance</p>
              <p className="text-lg font-semibold text-purple">{fmtKm(eod.distance_km_total)}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">Owed</p>
              <p className="text-lg font-semibold text-lime">{fmtCurrency(eod.total_compensation)}</p>
            </div>
          </div>

          {/* Per-bike table */}
          {eod.per_bike.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted text-xs">
                    <th className="text-left pb-2 font-medium">Plate</th>
                    <th className="text-right pb-2 font-medium">Deliveries</th>
                    <th className="text-right pb-2 font-medium">Distance</th>
                    <th className="text-right pb-2 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {eod.per_bike.map((b) => (
                    <tr key={b.bike_id}>
                      <td className="py-2 font-mono text-xs">{b.plate_number}</td>
                      <td className="py-2 text-right">{b.deliveries}</td>
                      <td className="py-2 text-right text-purple">{fmtKm(b.distance_km)}</td>
                      <td className="py-2 text-right text-lime">{fmtCurrency(b.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Per-bike analytics */}
      {analytics && analytics.bikes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Per-bike ({analytics.window_days}d)</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted text-xs">
                  <th className="text-left pb-2 font-medium">Plate</th>
                  <th className="text-right pb-2 font-medium">Deliveries</th>
                  <th className="text-right pb-2 font-medium">Distance</th>
                  <th className="text-right pb-2 font-medium">Avg km</th>
                  <th className="text-right pb-2 font-medium">Revenue</th>
                  <th className="text-right pb-2 font-medium">₦/km</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {analytics.bikes.map((b) => (
                  <tr key={b.bike_id}>
                    <td className="py-2 font-mono text-xs">{b.plate_number}</td>
                    <td className="py-2 text-right">{b.deliveries}</td>
                    <td className="py-2 text-right text-purple">{fmtKm(b.distance_km_total)}</td>
                    <td className="py-2 text-right text-muted">{fmtKm(b.avg_km_per_delivery)}</td>
                    <td className="py-2 text-right text-lime">{fmtCurrency(b.revenue_total)}</td>
                    <td className="py-2 text-right text-muted">{fmtCurrency(b.avg_revenue_per_km)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
