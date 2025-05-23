import React, { useEffect, useState } from 'react';
import { getAllReservations, updateReservation, deleteReservation } from '../../services/api/reservationApi';
import { updatePaiementStatus } from '../../services/api/paiementApi';
import Sidebar from '../Sidebar/Sidebar';
import './AdminReservations.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleUpdateStatus = async (id, statut) => {
    try {
      await updatePaiementStatus(id, statut);
      setReservations(reservations.map(r => r.id === id ? { ...r, statut } : r));
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setReservations(reservations.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <h2>Réservations & Paiements</h2>
        {loading ? (
          <p>Chargement des réservations...</p>
        ) : (
          <div className="reservations-list">
            {Array.isArray(reservations) && reservations.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Utilisateur</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(reservation => (
                    <tr key={reservation.id}>
                      <td>{reservation.id}</td>
                      <td>{reservation.utilisateur?.email || 'N/A'}</td>
                      <td>{reservation.statut || 'N/A'}</td>
                      <td>
                        <select
                          onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
                          defaultValue={reservation.statut}
                        >
                          <option value="PENDING">En attente</option>
                          <option value="PAID">Payé</option>
                          <option value="CANCELLED">Annulé</option>
                        </select>
                        <button onClick={() => handleDelete(reservation.id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucune réservation trouvée.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminReservations;