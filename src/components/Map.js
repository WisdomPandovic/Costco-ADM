import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const containerStyle = {
    width: '800px',
    height: '600px',
  };

  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Add map markers, polygons, etc. here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
