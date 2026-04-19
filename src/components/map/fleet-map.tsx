'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import type { BikeLocation, HeatmapPoint } from '@/types';
import 'leaflet/dist/leaflet.css';

// Leaflet marker icon fix for Next.js
import L from 'leaflet';
// @ts-expect-error leaflet internals
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function FitBounds({ locations }: { locations: BikeLocation[] }) {
  const map = useMap();
  useEffect(() => {
    const valid = locations.filter((l) => l.lat !== null && l.lng !== null);
    if (valid.length > 0) {
      const bounds = L.latLngBounds(valid.map((l) => [l.lat!, l.lng!]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [locations, map]);
  return null;
}

interface FleetMapProps {
  locations: BikeLocation[];
  heatmap: HeatmapPoint[];
}

export default function FleetMap({ locations, heatmap }: FleetMapProps) {
  const center: [number, number] = [6.5244, 3.3792]; // Lagos default

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%', background: '#1c1917' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Heatmap points (pickup locations) */}
      {heatmap.map((pt, i) => (
        <CircleMarker
          key={i}
          center={[pt.lat, pt.lng]}
          radius={4}
          pathOptions={{ color: '#c8ff00', fillColor: '#c8ff00', fillOpacity: 0.15, weight: 0 }}
        />
      ))}

      {/* Live bike locations */}
      {locations
        .filter((l) => l.lat !== null && l.lng !== null)
        .map((l) => (
          <CircleMarker
            key={l.bike_id}
            center={[l.lat!, l.lng!]}
            radius={8}
            pathOptions={{ color: '#7c3aed', fillColor: '#7c3aed', fillOpacity: 0.9, weight: 2 }}
          >
            <Popup>
              <div style={{ color: '#f5f5f4', background: '#1c1917', padding: '4px 8px', borderRadius: 6, minWidth: 120 }}>
                <p style={{ fontWeight: 600, marginBottom: 2 }}>{l.plate_number}</p>
                {l.updated_at && (
                  <p style={{ fontSize: 11, color: '#78716c' }}>
                    {new Date(l.updated_at).toLocaleTimeString('en-NG')}
                  </p>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}

      <FitBounds locations={locations} />
    </MapContainer>
  );
}
