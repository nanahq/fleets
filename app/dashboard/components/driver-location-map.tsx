"use client"
import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { DriverI } from "@nanahq/sticky";

export const DriverLocationMap: React.FC<{driver: DriverI}> = ({ driver }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    const defaultCenter = {
        lat: driver?.location?.coordinates?.[1] ?? 11.993410631597122,
        lng: driver?.location?.coordinates?.[0] ?? 8.54099929301555
    };

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const mapOptions = {
        zoom: 14,
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            options={{
                disableDefaultUI: true
            }}
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={mapOptions.zoom}
        >
            <Marker

                position={defaultCenter}
                options={{
                    icon: {
                        url: 'https://cdn-icons-png.flaticon.com/128/149/149059.png'
                    },

                }}
            />
        </GoogleMap>
    );
}
