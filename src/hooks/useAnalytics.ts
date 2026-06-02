import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { FleetEarningsResult, HeatmapPoint, EarningsWindow } from '@/types';

export function useEarnings(window: EarningsWindow) {
  return useQuery({
    queryKey: ['earnings', window],
    queryFn: () => api.get<FleetEarningsResult>(`/fleet/earnings?window=${window}`),
    refetchInterval: 60_000,
  });
}

export function useHeatmap() {
  return useQuery({
    queryKey: ['earnings', 'heatmap'],
    queryFn: () => api.get<HeatmapPoint[]>('/fleet/earnings/heatmap'),
    staleTime: 5 * 60_000,
  });
}
