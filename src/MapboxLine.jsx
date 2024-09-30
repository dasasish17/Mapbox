import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Set your Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFzYXNpc2giLCJhIjoiY20xaXB6dXBmMHJ0bTJ2b2cxdGg3OXFnOSJ9.7lYjfKe_NiKFWqOo8FI4kQ';

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.486052, 37.830348], // Center of the map
      zoom: 14 // Initial zoom level
    });

    mapRef.current.on('load', () => {
      // Define the GeoJSON data for the line
      const lineGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [-122.483696, 37.833818],
                [-122.483482, 37.833174],
                [-122.483396, 37.8327],
                [-122.483568, 37.832056],
                [-122.48404, 37.831141],
                [-122.48404, 37.830497],
                [-122.483482, 37.82992],
                [-122.483568, 37.829548],
                [-122.48507, 37.829446],
                [-122.4861, 37.828802],
                [-122.486958, 37.82931],
                [-122.487001, 37.830802],
                [-122.487516, 37.831683],
                [-122.488031, 37.832158],
                [-122.488889, 37.832971],
                [-122.489876, 37.832632],
                [-122.490434, 37.832937],
                [-122.49125, 37.832429],
                [-122.491636, 37.832564],
                [-122.492237, 37.833378],
                [-122.493782, 37.833683],
                [-122.495383, 37.833978],
                [-122.49698, 37.834378],
                [-122.498516, 37.834682],
                [-122.499976, 37.834878],
                [-122.501483, 37.835182],
                [-122.502947, 37.835482],
                [-122.50442, 37.835781]
              ]
            }
          }
        ]
      };

      // Add the GeoJSON line as a source
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: lineGeoJSON,
      });

      // Add a layer to display the line on the map
      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#FF0000', // Set line color to red
          'line-width': 4, // Set line width
        },
      });
    });

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '100vh' }}
      className="map-container"
    ></div>
  );
};

export default MapboxExample;
