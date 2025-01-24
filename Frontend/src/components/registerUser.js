import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterUser.css';
import axios from 'axios';
import config from '../config';

const RegisterUser = () => {
  const [user_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const role = 'client';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { user_name, email, password, first_name, last_name, role };

    try {
      await axios.post(config.BASE_URL_REGISTER, newUser);
      alert('User registered successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      navigate('/'); // Redirigir al login
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={user_name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>First Name</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/">Sign in here!</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterUser;
