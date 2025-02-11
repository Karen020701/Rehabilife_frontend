import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginForm';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import RegisterUser from './components/registerUser';
import OffersList from './components/offer-list';
import PaymentsList from './components/payment'; 
import Locations from './components/Locations';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/register" element={< RegisterUser ></RegisterUser> } />
          <Route path="/offers" element={<PrivateRoute><OffersList /></PrivateRoute>} />
          <Route path="/payments" element={<PrivateRoute><PaymentsList /></PrivateRoute>} />
          <Route path="/locations" element={<PrivateRoute><LocationsList /></PrivateRoute>} /> 

        </Routes>
      </div>
    </Router>
  );
};

export default App;
