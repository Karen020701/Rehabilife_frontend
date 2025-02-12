import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const role = localStorage.getItem('role'); 

  return (
    <div>
      <Link to="/offers">
        <button>Offers</button>
      </Link>
      <Link to="/payments">
            <button>Payments</button>
      </Link>
      <Link to="/products">
            <button>View Products</button>
      </Link>

      {role === 'admin' && (
        <>
          
          <Link to="/add-product">
            <button>Add Poduct</button>
          </Link>
          <Link to="/users">
            <button>Manage Users</button>
          </Link>
          <Link to="/categories">
            <button>Manage Categories</button>
          </Link>
          <Link to="/schedules">
            <button>Schedules</button>
          </Link>
          <Link to="/locations">
            <button>View Locations</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navigation;
