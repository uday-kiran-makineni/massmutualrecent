import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const Locate = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Example data: List of locations, each with type and coordinates
  const locations = [
    { id: 1, name: "City Hospital", type: "Hospital", lat: 37.7749, lng: -122.4194 },
    { id: 2, name: "Metro Diagnostics", type: "Diagnostic Center", lat: 37.7849, lng: -122.4094 },
    { id: 3, name: "Branch Office", type: "Office", lat: 37.7649, lng: -122.4294 },
  ];

  // Center map on a default location
  const mapCenter = { lat: 37.7749, lng: -122.4194 };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const handleDirectionsClick = () => {
    if (selectedLocation) {
      const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`;
      navigator.clipboard.writeText(directionsLink);
      alert("Directions link copied to clipboard! Share it with the user.");
    }
  };

  const getMarkerIcon = (type) => {
    return type === "Hospital" ? "/assets/hospital-icon.png" :
           type === "Diagnostic Center" ? "/assets/diagnostic-icon.png" : 
           "/assets/office-icon.png";
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBHdWfATegytaxRA7ESHintKP0QazsVTbk">
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        zoom={12}
        center={mapCenter}
      >
        {window.google && locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(location)}
            icon={{
              url: getMarkerIcon(location.type),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3>{selectedLocation.name}</h3>
              <p>Type: {selectedLocation.type}</p>
              <button onClick={handleDirectionsClick}>Get Directions</button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Locate;
