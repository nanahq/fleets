"use client"
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
    'pk.eyJ1Ijoic3VyYWphdXdhbCIsImEiOiJjbTJ6d3Y3ZDkwZml2MmtzNzZ4ODNkejc1In0.gQYN5B1HIFdJhpwv3Hyeqw';
export const Heatmap = ({
                           center = [-79.999732, 40.4374],
                           zoom = 11,
                           style = 'mapbox://styles/mapbox/dark-v11',
                           data
                       }) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    useEffect(() => {
        // Initialize map only if it hasn't been created yet
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: style,
            center: center,
            zoom: zoom
        });

        map.current.on('load', () => {
            map.current.addSource('earthquakes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': data || [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-79.999732, 40.4374]
                            }
                        }
                    ]
                }
            });

            map.current.addLayer({
                'id': 'earthquakes-heat',
                'type': 'heatmap',
                'source': 'earthquakes',
                'maxzoom': 15,
                'paint': {
                    // Increase the heatmap weight based on frequency and property magnitude
                    'heatmap-weight': [
                        'interpolate',
                        ['linear'],
                        ['get', 'mag'],
                        0, 0,
                        6, 1
                    ],
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                    'heatmap-intensity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        0, 1,
                        9, 3
                    ],
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparancy color
                    // to create a blur-like effect.
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0, 'rgba(0, 0, 255, 0)',
                        0.5, 'royalblue',
                        1, 'red'
                    ],
                    'heatmap-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        0, 2,
                        9, 20
                    ],
                    'heatmap-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        7, 1,
                        9, 0
                    ]
                }
            });
        });

        // Clean up on unmount
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [center, zoom, style, data]);

    return (
        <div
            ref={mapContainer}
            style={{
                width: '100%',
                height: '400px',  // Adjust height as needed
                borderRadius: '8px'
            }}
        />
    );
};
