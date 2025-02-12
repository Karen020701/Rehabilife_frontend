import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/developers.css";
import config from "../config"; // Importamos la configuración

const DevelopersList = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(config.BASE_URL_DEVELOPERS);
        
        if (response.data && Array.isArray(response.data)) {
          setDevelopers(response.data);
        } else {
          console.error("No developers found.");
        }
      } catch (err) {
        console.error("Error fetching developers:", err);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <div className="container">
      <h1>Developers List</h1>
      <div className="developers-list">
        {developers.length > 0 ? (
          developers.map((developer) => (
            <div key={developer.id} className="developer-card">
              <h3>{developer.name}</h3>
              <p><strong>Specialty:</strong> {developer.specialty}</p>
            </div>
          ))
        ) : (
          <p>No developers found.</p>
        )}
      </div>
    </div>
  );
};

export default DevelopersList;
