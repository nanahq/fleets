'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useBikes, useAddBike, useDeactivateBike } from '@/hooks/useBikes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function BikesPage() {
  const { data: bikes, isLoading } = useBikes();
  const addBike = useAddBike();
  const deactivate = useDeactivateBike();
  const [plateNumber, setPlateNumber] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  async function handleAdd() {
    if (!plateNumber.trim()) return;
    try {
      await addBike.mutateAsync(plateNumber.trim().toUpperCase());
      toast.success('Bike added');
      setPlateNumber('');
      setShowAdd(false);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to add bike');
    }
  }

  async function handleDeactivate(bikeId: string, plate: string) {
    if (!confirm(`Deactivate ${plate}?`)) return;
    try {
      await deactivate.mutateAsync(bikeId);
      toast.success('Bike deactivated');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to deactivate');
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-light">Bikes</h1>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)}>
          + Add bike
        </Button>
      </div>

      {showAdd && (
        <Card className="flex gap-3">
          <Input
            placeholder="ABC-123DE"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleAdd} disabled={addBike.isPending}>
            {addBike.isPending ? 'Adding…' : 'Save'}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : bikes && bikes.length > 0 ? (
        <div className="space-y-2">
          {bikes.map((bike) => (
            <Card key={bike.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-mono font-medium text-light">{bike.plate_number}</p>
                <p className="text-xs text-muted mt-0.5">
                  Added {new Date(bike.created_at).toLocaleDateString('en-NG')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={bike.is_active ? 'lime' : 'muted'}>
                  {bike.is_active ? 'Active' : 'Inactive'}
                </Badge>
                {bike.is_active && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeactivate(bike.id, bike.plate_number)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <p className="text-muted text-sm">No bikes yet. Add your first bike to get started.</p>
        </Card>
      )}
    </div>
  );
}
