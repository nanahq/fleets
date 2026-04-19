'use client';

import dynamic from 'next/dynamic';
import { useBikeLocations } from '@/hooks/useBikes';
import { useHeatmap } from '@/hooks/useAnalytics';
import { Badge } from '@/components/ui/badge';

const FleetMap = dynamic(() => import('@/components/map/fleet-map'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-surface text-muted text-sm">
      Loading map…
    </div>
  ),
});

export default function MapPage() {
  const { data: locations = [], dataUpdatedAt } = useBikeLocations();
  const { data: heatmap = [] } = useHeatmap();

  const activeBikes = locations.filter((l) => l.lat !== null && l.lng !== null);

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface shrink-0">
        <h1 className="text-sm font-semibold text-light flex-1">Live Map</h1>
        <Badge variant="purple">{activeBikes.length} active</Badge>
        <Badge variant="lime">{heatmap.length} pickups (30d)</Badge>
        {dataUpdatedAt > 0 && (
          <span className="text-xs text-muted hidden sm:block">
            Updated {new Date(dataUpdatedAt).toLocaleTimeString('en-NG')}
          </span>
        )}
      </div>

      {/* Map fills remaining space */}
      <div className="flex-1 relative">
        <FleetMap locations={locations} heatmap={heatmap} />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-border bg-surface shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-purple" />
          <span className="text-xs text-muted">Bike location</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-lime opacity-60" />
          <span className="text-xs text-muted">Pickup cluster</span>
        </div>
      </div>
    </div>
  );
}
