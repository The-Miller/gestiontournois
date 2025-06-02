// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllTournaments } from '../../services/api/tournamentApi';
// import Sidebar from '../Sidebar/Sidebar';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [tournaments, setTournaments] = useState([]);  // Initialisation en tant que tableau vide
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTournaments = async () => {
//       try {
//         const response = await getAllTournaments();
//         if (Array.isArray(response)) {
//           setTournaments(response);
//         } else {
//           console.error('La réponse de l\'API n\'est pas un tableau:', response);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des tournois:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTournaments();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="content">
//         <h2>Tableau de bord Admin</h2>
//         {loading ? (
//           <p>Chargement des tournois...</p>
//         ) : (
//           <div className="stats">
//             <h3>Tournois</h3>
//             {Array.isArray(tournaments) && tournaments.length > 0 ? (
//               <ul>
//                 {tournaments.map(tournament => (
//                   <li key={tournament.id}>
//                     {tournament.nom} - {tournament.categorie}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Aucun tournoi trouvé.</p>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
//
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../Sidebar/Sidebar';
// import './AdminDashboard.css';
//
// const AdminDashboard = () => {
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     navigate('/admin/overview', { replace: true });
//   }, [navigate]);
//
//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="content">
//         <p>Redirection vers l'aperçu...</p>
//       </main>
//     </div>
//   );
// };
//
// export default AdminDashboard;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/overview', { replace: true });
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Tableau de bord</h1>
            <p className="header-description">Redirection vers l'aperçu...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
