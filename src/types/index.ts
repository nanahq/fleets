// ── Auth ──────────────────────────────────────────────────────────────────────

export interface FleetMe {
  id: string;
  name: string;
  username: string;
  is_active: boolean;
  daily_base_pay: number;
  commission_rate: number;
  fuel_price_per_litre: number;
  fuel_efficiency: number;
  maintenance_cost_per_km: number;
  created_at: string;
}

// ── Earnings ──────────────────────────────────────────────────────────────────

export type EarningsWindow = 1 | 7 | 30;

export interface EarningsBreakdown {
  deliveryFeeGenerated: number;
  costs: {
    dailyBasePay: number;
    commission: number;
    fuel: number;
    maintenance: number;
    total: number;
  };
  netEarnings: number;
  marginPct: string;
}

export interface BikeEarnings {
  bike_id: string;
  plate_number: string;
  deliveries: number;
  distance_km: number;
  delivery_fee_total: number;
  earnings: EarningsBreakdown;
}

export interface FleetEarningsResult {
  from: string;
  to: string;
  window_days: number;
  config: {
    daily_base_pay: number;
    commission_rate: number;
    fuel_price_per_litre: number;
    fuel_efficiency: number;
    maintenance_cost_per_km: number;
  };
  summary: {
    deliveries: number;
    distance_km: number;
    delivery_fee_total: number;
    earnings: EarningsBreakdown;
  };
  bikes: BikeEarnings[];
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
}

// ── Daily Earnings (computed by nightly cron) ─────────────────────────────────

export interface FleetDailyEarning {
  id: string;
  fleet_id: string;
  date: string;
  total_deliveries: number;
  total_distance_km: number;
  total_delivery_fee: number;
  active_driver_count: number;
  cost_daily_base_pay: number;
  cost_commission: number;
  cost_fuel: number;
  cost_maintenance: number;
  total_costs: number;
  net_earnings: number;
  margin_pct: number;
  computed_at: string;
}

// ── Bikes ─────────────────────────────────────────────────────────────────────

export interface FleetBike {
  id: string;
  plate_number: string;
  is_active: boolean;
  created_at: string;
}

export interface BikeLocation {
  bike_id: string;
  plate_number: string;
  is_active: boolean;
  driver_id: string;
  driver_name: string | null;
  latitude: number;
  longitude: number;
  is_online: boolean;
  is_available: boolean;
  updated_at: string;
}
