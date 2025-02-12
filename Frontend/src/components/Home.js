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
            <button>Products</button>
      </Link>

      {role === 'admin' && (
        <>
          
          <Link to="/add-product">
            <button>Product</button>
          </Link>
          <Link to="/users">
            <button>Users</button>
          </Link>
          <Link to="/categories">
            <button>Categories</button>
          </Link>
          <Link to="/schedules">
            <button>Schedules</button>
          </Link>
          <Link to="/locations">
            <button>Locations</button>
          </Link>
          <Link to="/developers">
            <button>Developers</button>
          </Link>
          <Link to="/suggestion">
            <button>Suggestion</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navigation;
