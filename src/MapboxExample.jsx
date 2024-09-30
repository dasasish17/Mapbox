import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Set your Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFzYXNpc2giLCJhIjoiY20xazl2a2QyMGVuZzJrcTg3NHJwZGw2ciJ9.q3u6HM56FM1rykgsgUnLfQ';

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Initial center [lng, lat]
      zoom: 9, // Initial zoom
    });

    // When the map loads, add the circle layer
    mapRef.current.on('load', () => {
      // Example GeoJSON data for circle features
      const geojsonData = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-74.5, 40],
            },
            properties: {
              title: 'Feature 1',
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-74, 40.7],
            },
            properties: {
              title: 'Feature 2',
            },
          },
        ],
      };

      // Add a source for your features
      mapRef.current.addSource('circle-features', {
        type: 'geojson',
        data: geojsonData,
      });

      // Add a circle layer to display the features
      mapRef.current.addLayer({
        id: 'circle-layer',
        type: 'circle',
        source: 'circle-features',
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf',
        },
      });

      // Add click event listener to the circle layer
      mapRef.current.on('click', 'circle-layer', (e) => {
        // Get the coordinates of the clicked feature
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { title } = e.features[0].properties;

        // Center the map on the clicked feature
        mapRef.current.flyTo({
          center: coordinates,
          zoom: 12, // You can adjust the zoom level if necessary
        });

        // Optionally: Show a popup with the feature information
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h3>${title}</h3>`)
          .addTo(mapRef.current);
      });

      // Change the cursor to a pointer when hovering over the features
      mapRef.current.on('mouseenter', 'circle-layer', () => {
        mapRef.current.getCanvas().style.cursor = 'pointer';
      });

      // Reset the cursor when it leaves the circle features
      mapRef.current.on('mouseleave', 'circle-layer', () => {
        mapRef.current.getCanvas().style.cursor = '';
      });
    });

    // Clean up on unmount
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
    />
  );
};

export default MapboxExample;
