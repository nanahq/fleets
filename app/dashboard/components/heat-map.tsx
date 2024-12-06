"use client"
import React, { useEffect, useMemo } from 'react';
import { GoogleMap, useLoadScript, HeatmapLayer } from '@react-google-maps/api';

interface DeliveryI {
    _id: string;
    pickupLocation: {
        type: 'Point';
        coordinates: [number, number];
    };
}

interface DeliveryGridHeatmapProps {
    deliveries: DeliveryI[];
    gridSize?: number; // in kilometers
}

export const DeliveryHeatmap: React.FC<DeliveryGridHeatmapProps> = ({
                                                                        deliveries,
                                                                        gridSize = 0.5
                                                                    }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: ['visualization']
    });

    // Determine map center
    const mapCenter = useMemo(() => {
        if (deliveries.length > 0) {
            const [lat, lng] = deliveries[0].pickupLocation.coordinates;
            return { lat, lng };
        }
        // Default to San Francisco
        return { lat: 37.7749, lng: -122.4194 };
    }, [deliveries]);

    // Memoize heatmap data to avoid unnecessary recalculations
    const heatmapData = useMemo(() => {
        if (!isLoaded) return [];

        return deliveries.map(delivery => {
            const [lat, lng] = delivery.pickupLocation.coordinates;
            // Use window.google.maps.LatLng to ensure it's defined
            return new window.google.maps.LatLng(lat, lng);
        });
    }, [deliveries, isLoaded]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerClassName="w-full h-[100vh] rounded-lg shadow-md"
            center={mapCenter}
            zoom={14}
            options={{
                disableDefaultUI: true
            }}
        >
            {heatmapData.length > 0 && (
                <HeatmapLayer
                    data={heatmapData}
                    options={{
                        radius: 20,
                        opacity: 0.7,

                    }}
                />
            )}
        </GoogleMap>
    );
};

export default DeliveryHeatmap;
