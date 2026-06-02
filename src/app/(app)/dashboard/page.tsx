'use client';

import { useState } from 'react';
import { useEarnings } from '@/hooks/useAnalytics';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fmtCurrency, fmtKm, fmt } from '@/lib/utils';
import type { EarningsWindow, BikeEarnings } from '@/types';

const WINDOWS: { label: string; value: EarningsWindow }[] = [
  { label: 'Today', value: 1 },
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
];

function CostRow({ label, value, accent }: { label: string; value: number; accent?: 'red' | 'green' | 'muted' }) {
  const colour =
    accent === 'red' ? 'text-red-400' :
    accent === 'green' ? 'text-lime' :
    'text-light';
  return (
    <div className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
      <span className="text-muted">{label}</span>
      <span className={`font-medium ${colour}`}>{fmtCurrency(value)}</span>
    </div>
  );
}

function BikeRow({ bike }: { bike: BikeEarnings }) {
  const [open, setOpen] = useState(false);
  const isProfit = bike.earnings.netEarnings >= 0;

  return (
    <div>
      <button
        className="w-full text-left flex items-center justify-between py-3 px-1 border-b border-border hover:opacity-80 transition-opacity"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="font-mono text-sm font-medium text-light">{bike.plate_number}</p>
          <p className="text-xs text-muted mt-0.5">{bike.deliveries} deliveries · {fmtKm(bike.distance_km)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-lime">{fmtCurrency(bike.earnings.deliveryFeeGenerated)}</p>
          <p className={`text-xs font-medium ${isProfit ? 'text-lime' : 'text-red-400'}`}>
            {isProfit ? '+' : ''}{fmtCurrency(bike.earnings.netEarnings)} net
          </p>
        </div>
      </button>

      {open && (
        <div className="bg-surface rounded-xl p-4 mt-1 mb-2 space-y-2 text-sm">
          <CostRow label="Delivery Fee Collected" value={bike.earnings.deliveryFeeGenerated} accent="green" />
          <CostRow label="Daily Base Pay" value={bike.earnings.costs.dailyBasePay} accent="red" />
          <CostRow label="Fuel Cost" value={bike.earnings.costs.fuel} accent="red" />
          <CostRow label="Maintenance" value={bike.earnings.costs.maintenance} accent="red" />
          <CostRow label="Platform Commission" value={bike.earnings.costs.commission} accent="red" />
          <div className="flex items-center justify-between pt-2 font-semibold text-sm">
            <span className="text-muted">Net Earnings</span>
            <span className={isProfit ? 'text-lime' : 'text-red-400'}>
              {fmtCurrency(bike.earnings.netEarnings)} ({bike.earnings.marginPct})
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [window, setWindow] = useState<EarningsWindow>(1);
  const { data: earnings, isLoading } = useEarnings(window);

  const summary = earnings?.summary;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header + window selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-light">Earnings</h1>
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
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : summary ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatCard label="Deliveries" value={summary.deliveries} accent="light" />
            <StatCard label="Distance" value={fmtKm(summary.distance_km)} accent="purple" />
            <StatCard label="Delivery Fees" value={fmtCurrency(summary.earnings.deliveryFeeGenerated)} accent="lime" />
            <StatCard label="Total Costs" value={fmtCurrency(summary.earnings.costs.total)} accent="light" />
            <StatCard label="Net Earnings" value={fmtCurrency(summary.earnings.netEarnings)} accent={summary.earnings.netEarnings >= 0 ? 'lime' : 'light'} />
            <StatCard label="Margin" value={summary.earnings.marginPct} accent="light" />
          </div>

          {/* Cost breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CostRow label="Delivery Fees Collected" value={summary.earnings.deliveryFeeGenerated} accent="green" />
            <CostRow label="Daily Base Pay (all bikes)" value={summary.earnings.costs.dailyBasePay} accent="red" />
            <CostRow label="Fuel" value={summary.earnings.costs.fuel} accent="red" />
            <CostRow label="Maintenance" value={summary.earnings.costs.maintenance} accent="red" />
            <CostRow label="Platform Commission" value={summary.earnings.costs.commission} accent="red" />
            <div className="flex items-center justify-between pt-3 font-semibold">
              <span className="text-muted text-sm">Net Earnings</span>
              <span className={`text-base ${summary.earnings.netEarnings >= 0 ? 'text-lime' : 'text-red-400'}`}>
                {fmtCurrency(summary.earnings.netEarnings)}
              </span>
            </div>
          </Card>
        </>
      ) : null}

      {/* Per-bike breakdown */}
      {earnings && earnings.bikes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Per Bike</CardTitle>
            <span className="text-xs text-muted">Tap a bike to see cost breakdown</span>
          </CardHeader>
          <div>
            {earnings.bikes.map((bike) => (
              <BikeRow key={bike.bike_id} bike={bike} />
            ))}
          </div>
        </Card>
      )}

      {/* Config */}
      {earnings?.config && (
        <Card>
          <CardHeader><CardTitle>Earnings Config</CardTitle></CardHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              { label: 'Daily Base Pay', value: fmtCurrency(earnings.config.daily_base_pay) },
              { label: 'Commission', value: `${(earnings.config.commission_rate * 100).toFixed(0)}%` },
              { label: 'Fuel Price', value: `₦${earnings.config.fuel_price_per_litre}/L` },
              { label: 'Fuel Efficiency', value: `${earnings.config.fuel_efficiency} km/L` },
              { label: 'Maintenance', value: `₦${earnings.config.maintenance_cost_per_km}/km` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-bg rounded-lg p-3">
                <p className="text-xs text-muted mb-0.5">{label}</p>
                <p className="font-semibold text-light">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
