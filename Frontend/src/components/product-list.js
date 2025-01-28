import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import './styles/products-list.css';
import config from '../config';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mark: '',
    advert: '',
    image_url: ''
  });
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(config.BASE_URL_PRODUCT);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      mark: product.mark,
      advert: product.advert,
      image_url: product.image_url
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.BASE_URL_PRODUCT_UPDATE}/${selectedProduct.id}`, formData);
      handleCloseEditModal();
      fetchProducts();
    } catch (err) {
      console.error('Error updating products:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${config.BASE_URL_PRODUCT_DELETE}/${selectedProduct.id}`);
      handleCloseDeleteModal();
      fetchProducts();
    } catch (err) {
      console.error('Error deleting products:', err);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Products List</h1>
      <div className="products-list-container">
        <div className="products-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Precio:</strong> {product.price}</p>
              <p><strong>Marca:</strong> {product.mark}</p>
              <p><strong>Aviso:</strong> {product.advert}</p>
              {role === 'admin' ? (
                <div className="action-buttons">
                  <button className="edit" onClick={() => handleEditClick(product)}>Editar</button>
                  <button className="delete" onClick={() => handleDeleteClick(product)}>Eliminar</button>
                </div>
              ) : (
                <p>Solo los administradores pueden editar o eliminar productos.</p>
              )}
            </div>
          ))}
        </div>
        <div className="home-button-container">
          <button className="home-button" onClick={handleHomeClick}>Regresar al Home</button>
        </div>
      </div>

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseEditModal}
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
          contentLabel="Edit Product"
        >
          <h2 className="modal-title">Editar Producto</h2>
            <form onSubmit={handleEditFormSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Precio:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mark">Marca:</label>
                <input
                  type="text"
                  id="mark"
                  name="mark"
                  value={formData.mark}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="advert">Aviso:</label>
                <input
                  type="text"
                  id="advert"
                  name="advert"
                  value={formData.advert}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image_url">URL de la Imagen:</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="modal-input"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="modal-save-button">
                  Guardar
                </button>
                <button type="button" onClick={handleCloseEditModal} className="modal-cancel-button">
                  Cancelar
                </button>
              </div>
            </form>

        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={handleCloseDeleteModal}
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
          contentLabel="Delete Product"
        >
          <h2>Confirmar Eliminación</h2>
          <p>¿Estás seguro de eliminar el producto "{selectedProduct?.name}"?</p>
          <button type="button" className="modal-delete-button" onClick={handleDeleteConfirm}>Sí, Eliminar</button>
          <button type="button" className="modal-cancel-button" onClick={handleCloseDeleteModal}>Cancelar</button>
        </Modal>
      )}
    </div>
  );
};

export default ProductsList;
