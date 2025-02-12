import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginForm';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import RegisterUser from './components/registerUser';
import OffersList from './components/offer-list';
import PaymentsList from './components/payment'; 
import LocationsList from "./components/locations-list";
import AddProduct from './components/products-add';
import UserList from "./components/user-list";
import ProductsList from './components/product-list';
import CategoryList from './components/category-list';
import SchedulesList from './components/schedules-list';
import DevelopersList from "./components/developers-list";
import SuggestionBox from "./components/suggestion-box";
import InventoriesList from './components/InventoriesList';


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
          <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/locations" element={<LocationsList />} />
          <Route path="/users" element={<PrivateRoute requiredRole="admin"><UserList /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><ProductsList /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute requiredRole="admin"><CategoryList /></PrivateRoute>} />
          <Route path="/schedules" element={<SchedulesList />} />
          <Route path="/developers" element={<DevelopersList />} />
          <Route path="/suggestion" element={<SuggestionBox />} />
          <Route path="/inventories" element={<InventoriesList />} />




        </Routes>
      </div>
    </Router>
  );
};

export default App;
