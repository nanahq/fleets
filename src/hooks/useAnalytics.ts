import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { AnalyticsResult, EodResult, HeatmapPoint, AnalyticsWindow } from '@/types';

export function useAnalytics(window: AnalyticsWindow) {
  return useQuery({
    queryKey: ['analytics', window],
    queryFn: () => api.get<AnalyticsResult>(`/fleet/analytics?window=${window}`),
    refetchInterval: 60_000,
  });
}

export function useEod() {
  return useQuery({
    queryKey: ['analytics', 'eod'],
    queryFn: () => api.get<EodResult>('/fleet/analytics/eod'),
    refetchInterval: 60_000,
  });
}

export function useHeatmap() {
  return useQuery({
    queryKey: ['analytics', 'heatmap'],
    queryFn: () => api.get<HeatmapPoint[]>('/fleet/analytics/heatmap'),
    staleTime: 5 * 60_000,
  });
}
