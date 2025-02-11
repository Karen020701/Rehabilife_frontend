import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/locations.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3016/apiLocations.php');
        if (response.data && response.data.length > 0) {
          const locationsArray = response.data.map(location => ({
            id: location.id,
            city: location.city,
            address: location.address,
            opening_hours: location.opening_hours
          }));
          setLocations(locationsArray);
        } else {
          console.error('No se encontraron ubicaciones.');
        }
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="container">
      <h1>Locations List</h1>
      <div className="locations-list">
        {locations.length > 0 ? (
          locations.map((location) => (
            <div key={location.id} className="location-card">
              <h3>{location.city}</h3>
              <p><strong>Address:</strong> {location.address}</p>
              <p><strong>Opening Hours:</strong> {location.opening_hours}</p>
            </div>
          ))
        ) : (
          <p>No locations found.</p>
        )}
      </div>
    </div>
  );
};

export default Locations;
