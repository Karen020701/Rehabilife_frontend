import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/locations.css";
import config from "../config"; // Importamos la configuración

const LocationsList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(config.BASE_URL_LOCATIONS);
        
        if (response.data && Array.isArray(response.data)) {
          setLocations(response.data);
        } else {
          console.error("No locations found.");
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
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

export default LocationsList;
