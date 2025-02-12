import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/inventories-list.css';

const InventoriesList = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.post('http://localhost:5003/graphql', {
          query: `
            query {
              inventory {
                id
                name
                description
                quantity
                price
              }
            }
          `
        });

        setInventories(response.data.data.inventory);
      } catch (err) {
        console.error('Error fetching inventories:', err);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div className="container">
      <h1>Inventories List</h1>
      <div className="inventories-list">
        {inventories.length > 0 ? (
          inventories.map((inventory) => (
            <div key={inventory.id} className="inventory-card">
              <h3>{inventory.name}</h3>
              <p><strong>Description:</strong> {inventory.description}</p>
              <p><strong>Quantity:</strong> {inventory.quantity}</p>
              <p><strong>Price:</strong> ${inventory.price}</p>
            </div>
          ))
        ) : (
          <p>No inventories found.</p>
        )}
      </div>
    </div>
  );
};

export default InventoriesList;
