import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../../services/api/userApi';
import Sidebar from '../Sidebar/Sidebar';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ email: '', role: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, formData);
        setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
        setEditingId(null);
        setFormData({ email: '', role: '' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEdit = (user) => {
    setFormData({ email: user.email, role: user.role });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Gestion des Utilisateurs</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            disabled={!editingId}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionner un rôle</option>
            <option value="UTILISATEUR">Utilisateur</option>
            <option value="ADMINISTRATEUR">Administrateur</option>
            <option value="COMMUNITY_MANAGER">Community Manager</option>
            <option value="SuperAdministrateur">Super Administrateur</option>
          </select>
          <button type="submit" disabled={!editingId}>Mettre à jour</button>
        </form>
        {loading ? (
          <p>Chargement des utilisateurs...</p>
        ) : (
          <div className="users-list">
            {Array.isArray(users) && users.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={() => handleEdit(user)}>Modifier</button>
                        <button onClick={() => handleDelete(user.id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun utilisateur trouvé.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUsers;