// ── Auth ──────────────────────────────────────────────────────────────────────

export interface FleetMe {
  id: string;
  name: string;
  username: string;
  revenue_model: 'FULL_SERVICE' | 'BIKE_ONLY';
  commission_rate: number;
  is_active: boolean;
  created_at: string;
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export type AnalyticsWindow = 1 | 7 | 30;

export interface BikeStats {
  bike_id: string;
  plate_number: string;
  deliveries: number;
  distance_km_total: number;
  avg_km_per_delivery: number;
  avg_deliveries_per_km: number;
  revenue_total: number;
  avg_revenue_per_km: number;
}

export interface FleetSummary {
  deliveries: number;
  distance_km_total: number;
  avg_km_per_delivery: number;
  avg_deliveries_per_km: number;
  revenue_total: number;
  avg_revenue_per_km: number;
}

export interface AnalyticsResult {
  window_days: number;
  from: string;
  to: string;
  summary: FleetSummary;
  bikes: BikeStats[];
}

export interface EodResult {
  date: string;
  commission_rate: number;
  revenue_model: string;
  deliveries: number;
  distance_km_total: number;
  total_compensation: number;
  per_bike: {
    bike_id: string;
    plate_number: string;
    deliveries: number;
    distance_km: number;
    revenue: number;
  }[];
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
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
  lat: number | null;
  lng: number | null;
  updated_at: string | null;
}

// ── Payments ──────────────────────────────────────────────────────────────────

export type PaymentStatus = 'pending' | 'paid' | 'cancelled';

export interface FleetPayment {
  id: string;
  fleet_id: string;
  period_start: string;
  period_end: string;
  total_km: number;
  total_amount: number;
  status: PaymentStatus;
  reference: string | null;
  paid_at: string | null;
  created_at: string;
}
