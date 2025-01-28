import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/products-add.css';
import config from '../config';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mark, setMark] = useState('');
  const [advert, setAdvert] = useState('');
  const [image_url, setImageUrl] = useState('');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      alert('You do not have permission to add products.');
      navigate('/');
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price,
      mark,
      advert,
      image_url,
    };

    try {
      await axios.post(config.BASE_URL_PRODUCT_CREATE, newProduct);
      alert('Product added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Error adding product. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-product-container">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Mark</label>
        <input
          type="text"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
          required
        />
        <label>Advert</label>
        <input
          type="text"
          value={advert}
          onChange={(e) => setAdvert(e.target.value)}
          required
        />
        <label>Image URL</label>
        <input
          type="text"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <div className="button-group">
          <button type="submit">Add Product</button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;