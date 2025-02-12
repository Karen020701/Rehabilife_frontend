import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./styles/category-list.css";
import config from "../config";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      alert("You do not have permission to view this page.");
      navigate("/");
    } else {
      fetchCategories();
    }
  }, [role, navigate]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(config.BASE_URL_CATEGORIES);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.BASE_URL_CATEGORY_UPDATE}/${selectedCategory.id}`, formData);
      handleCloseEditModal();
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${config.BASE_URL_CATEGORY_DELETE}/${selectedCategory.id}`);
      handleCloseDeleteModal();
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="category-list-container">
      <h2>Categories List</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditClick(category)}>
                  ✏️ Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteClick(category)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseEditModal}
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
          contentLabel="Edit Category"
        >
          <h2 className="modal-title">Edit Category</h2>
          <form onSubmit={handleEditFormSubmit} className="modal-form">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

            <label>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} />

            <div className="modal-buttons">
              <button type="submit" className="modal-save-button">Save</button>
              <button type="button" className="modal-cancel-button" onClick={handleCloseEditModal}>Cancel</button>
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
          contentLabel="Delete Category"
        >
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete category "{selectedCategory?.name}"?</p>
          <button className="modal-delete-button" onClick={handleDeleteConfirm}>Yes, Delete</button>
          <button className="modal-cancel-button" onClick={handleCloseDeleteModal}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default CategoryList;
