import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./styles/user-list.css";
import config from "../config";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      alert("You do not have permission to view this page.");
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [role, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(config.BASE_URL_USERS);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
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
      await axios.put(`${config.BASE_URL_USER_UPDATE}/${selectedUser.id}`, formData);
      handleCloseEditModal();
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${config.BASE_URL_USER_DELETE}/${selectedUser.id}`);
      handleCloseDeleteModal();
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-list-container">
      <h2>Users List</h2>
      <button className="new-user-button" onClick={() => navigate("/register")}>
        + New
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditClick(user)}>
                  ✏️ Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteClick(user)}>
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
          contentLabel="Edit User"
        >
          <h2 className="modal-title">Edit User</h2>
          <form onSubmit={handleEditFormSubmit} className="modal-form">
            <label>Firstname:</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />

            <label>Lastname:</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleInputChange}>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </select>

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
          contentLabel="Delete User"
        >
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete user "{selectedUser?.first_name} {selectedUser?.last_name}"?</p>
          <button className="modal-delete-button" onClick={handleDeleteConfirm}>Yes, Delete</button>
          <button className="modal-cancel-button" onClick={handleCloseDeleteModal}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
