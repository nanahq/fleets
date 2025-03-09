"use client";
import React, { useMemo, useCallback } from "react";
import {
    GoogleMap,
    Marker,
    useLoadScript,
    GoogleMapProps,
} from "@react-google-maps/api";
import { DriverI } from "@nanahq/sticky";

// Define types for coordinates and props
interface Coordinates {
    lat: number;
    lng: number;
}

interface DriverLocationMapProps {
    driver: DriverI;
    mapHeight?: string;
    customIcon?: string;
}

export const DriverLocationMap: React.FC<DriverLocationMapProps> = ({
                                                                        driver,
                                                                        mapHeight = "400px",
                                                                        customIcon = "https://cdn-icons-png.flaticon.com/128/149/149059.png",
                                                                    }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"], // Add additional Google Maps libraries if needed
    });

    // Memoize the center coordinates to prevent unnecessary re-renders
    const center = useMemo<Coordinates>(() => ({
        lat: driver?.location?.coordinates?.[1] ?? 11.993410631597122,
        lng: driver?.location?.coordinates?.[0] ?? 8.54099929301555,
    }), [driver?.location?.coordinates]);

    // Map container styling
    const mapContainerStyle = {
        width: "100%",
        height: mapHeight,
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    };

    // Map configuration options
    const mapOptions: GoogleMapProps["options"] = {
        zoom: 14,
        disableDefaultUI: false, // Changed to false to keep useful controls
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
    };

    // Memoize marker options
    const getMarkerOptions = () => {
        if (!isLoaded) return undefined;
        return {
            icon: {
                url: customIcon,
                scaledSize: new window!.google.maps.Size(32, 32),
            },
            title: `${driver?.firstName || "Driver"}'s Location`,
        };
    };
    // Handle map load callback
    const onMapLoad = useCallback((map: google.maps.Map) => {
        map.setCenter(center);
    }, [center]);

    // Loading and error states
    if (loadError) {
        return (
            <div className="error-container" style={{ color: "red", padding: "20px" }}>
                Unable to load map. Please check your internet connection or API key.
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="loading-container" style={{ padding: "20px" }}>
                Loading driver location...
            </div>
        );
    }

    return (
        <div className="driver-map-wrapper">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                options={mapOptions}
                onLoad={onMapLoad}
            >
                <Marker
                    position={center}
                    options={getMarkerOptions()}
                    animation={google.maps.Animation.DROP}
                />
            </GoogleMap>
            {/* Optional driver info overlay */}
            {driver?.firstName && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        background: "white",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                >
                    Driver: {driver.firstName}
                </div>
            )}
        </div>
    );
};

// Optional: Add default props
DriverLocationMap.defaultProps = {
    mapHeight: "400px",
};