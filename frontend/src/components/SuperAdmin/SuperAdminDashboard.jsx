import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api/authApi';
import Sidebar from '../Sidebar/Sidebar';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'SuperAdministrateur') {
      navigate('/connexion');
      return;
    }

    const mockUsers = [
      { id: 1, nom: 'Admin', prenom: 'Super', email: 'super@admin.com', role: 'SuperAdministrateur' },
      { id: 2, nom: 'Doe', prenom: 'John', email: 'john@doe.com', role: 'Administrateur' }
    ];
    setUsers(mockUsers);
  }, [navigate, user]);

  const startNewUser = () => {
    setUserToEdit({ nom: '', prenom: '', email: '', password: '', role: 'Administrateur' });
    setIsEditMode(false);
  };

  const editUser = (user) => {
    setUserToEdit({ ...user });
    setIsEditMode(true);
  };

  const saveUser = () => {
    if (isEditMode) {
      setUsers(users.map(u => u.id === userToEdit.id ? userToEdit : u));
    } else {
      const newUser = { ...userToEdit, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setUserToEdit(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const cancelEdit = () => {
    setUserToEdit(null);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <div className="user-management">
          <h2>Gestion des Utilisateurs</h2>
          
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => editUser(user)} className="btn btn-primary">Modifier</button>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={startNewUser} className="btn btn-primary">
            Ajouter un nouvel utilisateur
          </button>

          {userToEdit && (
            <div className="user-form">
              <h3>{isEditMode ? 'Modifier' : 'Ajouter'} un utilisateur</h3>
              <form onSubmit={(e) => { e.preventDefault(); saveUser(); }}>
                <div className="form-group">
                  <label>Nom:</label>
                  <input
                    type="text"
                    value={userToEdit.nom}
                    onChange={(e) => setUserToEdit({...userToEdit, nom: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Prénom:</label>
                  <input
                    type="text"
                    value={userToEdit.prenom}
                    onChange={(e) => setUserToEdit({...userToEdit, prenom: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={userToEdit.email}
                    onChange={(e) => setUserToEdit({...userToEdit, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={userToEdit.password}
                    onChange={(e) => setUserToEdit({...userToEdit, password: e.target.value})}
                    required={!isEditMode}
                  />
                </div>
                
                <div className="form-group">
                  <label>Role:</label>
                  <select
                    value={userToEdit.role}
                    onChange={(e) => setUserToEdit({...userToEdit, role: e.target.value})}
                    required
                  >
                    <option value="SuperAdministrateur">SuperAdministrateur</option>
                    <option value="Administrateur">Administrateur</option>
                    <option value="CommunityManager">CommunityManager</option>
                  </select>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                  Annuler
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;