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

      {role === 'admin' && (
        <>
          
          <Link to="/admin">
            <button>admin</button>
          </Link>
          

        </>
      )}
    </div>
  );
};

export default Navigation;
