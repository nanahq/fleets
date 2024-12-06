"use client"
import React, { useRef, useMemo } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { DeliveryI } from "@nanahq/sticky";

// Our db stores coords as [lat, lng] and Google Maps uses [lat, lng]
export function googleMapsCordMapper(cord: [number, number]): {lat: number, lng: number} {
    return { lat: cord[0], lng: cord[1] }
}

export const DeliveryLocationMap: React.FC<{delivery: DeliveryI}> = ({ delivery }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    const pickupCoords = useMemo(() =>
            googleMapsCordMapper(delivery?.pickupLocation?.coordinates ?? [0, 0]),
        [delivery]
    );

    const dropoffCoords = useMemo(() =>
            googleMapsCordMapper(delivery?.dropOffLocation?.coordinates ?? [0, 0]),
        [delivery]
    );

    const pickupName = 'Pickup Location';

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerClassName="w-full h-[400px] rounded-lg"
            center={pickupCoords}
            zoom={14}
            options={{
                disableDefaultUI: true,
            }}
        >

            <Marker
                position={pickupCoords}
                options={{
                    title:pickupName,
                    icon: {
                        url: 'https://cdn-icons-png.flaticon.com/128/1483/1483336.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                    },
                    label: {
                        text: pickupName,
                        className: 'marker-label',
                        color: ''
                    }
                }}
            />


            <Marker
                position={dropoffCoords}
                options={{
                    icon: {
                        url: 'https://cdn-icons-png.flaticon.com/128/1483/1483336.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                    },
                    label: {
                        text: 'Delivery Location',
                        className: 'marker-label',
                        color: ''
                    },
                }}
            />

            <Polyline
                path={[pickupCoords, dropoffCoords]}
                options={{
                    strokeColor: '#888',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    icons: [{
                        icon: {
                            path: 'M 0,-1 0,1',
                            strokeOpacity: 1,
                            scale: 4
                        },
                        offset: '0',
                        repeat: '20px'
                    }]
                }}
            />
        </GoogleMap>
    );
}
