import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { FleetPayment } from '@/types';

export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: () => api.get<FleetPayment[]>('/fleet/payments'),
  });
}
