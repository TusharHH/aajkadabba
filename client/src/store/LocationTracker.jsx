import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Routing = ({ position, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!position || !destination) return;

    // Create a routing control instance
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(position[0], position[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
    }).addTo(map);

    return () => {
      // Remove the routing control from the map on cleanup
      map.removeControl(routingControl);
    };
  }, [position, destination, map]);

  return null;
};

const GeoZone = () => {
  const [position, setPosition] = useState(null);
  const [radius] = useState(5000); // 5 km
  const [destination, setDestination] = useState(null);

  // Simulate delivery boy movement
  const simulateDeliveryBoyMovement = () => {
    if (!position) return;

    // Simulating movement by slightly changing the latitude and longitude
    const newLat = position[0] + (Math.random() - 0.5) * 0.01; // Change latitude
    const newLng = position[1] + (Math.random() - 0.5) * 0.01; // Change longitude
    setPosition([newLat, newLng]);
  };

  // Get the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);

        // Set a destination slightly away from the delivery boy's position for testing
        setDestination([latitude + 0.02, longitude + 0.02]);
      },
      (error) => {
        console.error('Error fetching location:', error);
      },
      { enableHighAccuracy: true }
    );

    // Set interval to simulate movement every 2 seconds
    const interval = setInterval(simulateDeliveryBoyMovement, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={position} icon={customIcon} />
          <Circle
            center={position}
            radius={radius}
            color="blue"
            fillColor="lightblue"
            fillOpacity={0.4}
          />

          {position && destination && (
            <Routing position={position} destination={destination} />
          )}
        </MapContainer>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
};

export default GeoZone;
