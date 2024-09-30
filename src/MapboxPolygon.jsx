import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    // Set your Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFzYXNpc2giLCJhIjoiY20xaXB6dXBmMHJ0bTJ2b2cxdGg3OXFnOSJ9.7lYjfKe_NiKFWqOo8FI4kQ';

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-88.137343, 35.137451], // Initial center coordinates
      zoom: 3, // Initial zoom level
      maxZoom: 6 // Limit zoom to a maximum level
    });

    mapRef.current.on('load', () => {
      // Get all layers in the map style
      const layers = mapRef.current.getStyle().layers;
      let firstSymbolId;

      // Find the first symbol layer (usually labels)
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          firstSymbolId = layer.id;
          break;
        }
      }

      // Add the GeoJSON source for urban areas
      mapRef.current.addSource('urban-areas', {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson' // External GeoJSON data for urban areas
      });

      // Add the fill layer for urban areas, below the first symbol layer
      mapRef.current.addLayer(
        {
          id: 'urban-areas-fill',
          type: 'fill',
          source: 'urban-areas', // Use the GeoJSON source
          layout: {},
          paint: {
            'fill-color': '#f08', // Pink color for the fill
            'fill-opacity': 0.4   // Semi-transparent fill
          }
        },
        firstSymbolId // Place the layer below the first symbol layer (labels)
      );
    });
  }, []);

  return (
    <div id="map" ref={mapContainerRef} style={{ height: '100vh' }}></div> // Full height container for the map
  );
};

export default MapboxExample;
