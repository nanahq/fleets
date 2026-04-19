import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { FleetBike, BikeLocation } from '@/types';

export function useBikes() {
  return useQuery({
    queryKey: ['bikes'],
    queryFn: () => api.get<FleetBike[]>('/fleet/bikes'),
  });
}

export function useBikeLocations() {
  return useQuery({
    queryKey: ['bikes', 'locations'],
    queryFn: () => api.get<BikeLocation[]>('/fleet/bikes/locations'),
    refetchInterval: 10_000,
  });
}

export function useAddBike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (plate_number: string) =>
      api.post<FleetBike>('/fleet/bikes', { plate_number }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bikes'] }),
  });
}

export function useDeactivateBike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bikeId: string) => api.delete(`/fleet/bikes/${bikeId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bikes'] }),
  });
}
