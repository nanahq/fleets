'use client';

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
    </MapContainer>
  );
}
