// import { useState, useEffect } from "react"
// import Sidebar from "../Sidebar/Sidebar"
// import { Trophy, Users, UserCircle, Calendar, RefreshCw, BarChart3, ChevronLeft, ChevronRight } from "lucide-react"
// import { getAllTournaments } from "../../services/api/tournamentApi"
// import { getAllEquipes } from "../../services/api/teamApi"
// import { getAllUsers } from "../../services/api/userApi"
// import { getAllReservations } from "../../services/api/reservationApi"
// import "./AdminOverview.css"
//
// const AdminOverview = () => {
//   const [stats, setStats] = useState({
//     tournaments: 0,
//     teams: 0,
//     users: 0,
//     reservations: 0,
//   })
//   const [historicalData, setHistoricalData] = useState({
//     users: [],
//     teams: [],
//     labels: [],
//   })
//   const [reservationEvents, setReservationEvents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [currentMonth, setCurrentMonth] = useState(new Date())
//
//   // Fonction pour organiser les données historiques par mois
//   const organizeDataByMonth = (data, dateField) => {
//     const monthlyData = {}
//     const now = new Date()
//
//     // Initialiser les 12 derniers mois avec des valeurs à 0
//     for (let i = 11; i >= 0; i--) {
//       const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
//       const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
//       monthlyData[monthKey] = 0
//     }
//
//     // Compter les éléments par mois de création
//     data.forEach((item) => {
//       const date = new Date(item[dateField])
//       const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
//
//       // Ne compter que les 12 derniers mois
//       if (monthlyData[monthKey] !== undefined) {
//         monthlyData[monthKey]++
//       }
//     })
//
//     // Convertir les clés de mois en noms de mois pour l'affichage
//     const labels = Object.keys(monthlyData).map((key) => {
//       const [year, month] = key.split("-")
//       return new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1).toLocaleString("fr-FR", { month: "short" })
//     })
//
//     return {
//       values: Object.values(monthlyData),
//       labels,
//     }
//   }
//
//   // Fonction pour organiser les réservations en événements de calendrier
//   const organizeReservationsAsEvents = (reservations) => {
//     return reservations.map((reservation) => {
//       const date = new Date(reservation.date || reservation.createdAt)
//       return {
//         id: reservation.id,
//         date,
//         title: reservation.title || "Réservation",
//         type: "reservation",
//       }
//     })
//   }
//
//   const fetchStats = async () => {
//     try {
//       setRefreshing(true)
//
//       const [tournaments, teams, users, reservations] = await Promise.all([
//         getAllTournaments(),
//         getAllEquipes(),
//         getAllUsers(),
//         getAllReservations(),
//       ])
//
//       // Mettre à jour les statistiques actuelles
//       setStats({
//         tournaments: tournaments.length,
//         teams: teams.length,
//         users: users.length,
//         reservations: reservations.length,
//       })
//
//       // Organiser les données historiques pour le graphique
//       const usersData = organizeDataByMonth(users, "createdAt")
//       const teamsData = organizeDataByMonth(teams, "createdAt")
//
//       setHistoricalData({
//         users: usersData.values,
//         teams: teamsData.values,
//         labels: usersData.labels,
//       })
//
//       // Organiser les réservations pour le calendrier
//       setReservationEvents(organizeReservationsAsEvents(reservations))
//
//       setError(null)
//     } catch (err) {
//       console.error("Erreur lors de la récupération des statistiques :", err)
//       setError("Impossible de charger les statistiques. Veuillez vérifier votre connexion ou réessayer plus tard.")
//     } finally {
//       setLoading(false)
//       setRefreshing(false)
//     }
//   }
//
//   useEffect(() => {
//     fetchStats()
//   }, [])
//
//   // Fonctions pour le calendrier
//   const getDaysInMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
//   }
//
//   const getFirstDayOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
//   }
//
//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
//   }
//
//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
//   }
//
//   const renderCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentMonth)
//     const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
//     const monthName = currentMonth.toLocaleString("fr-FR", { month: "long" })
//     const year = currentMonth.getFullYear()
//
//     const days = []
//     // Ajouter les jours vides pour le début du mois
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
//     }
//
//     // Ajouter les jours du mois
//     for (let i = 1; i <= daysInMonth; i++) {
//       const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
//
//       // Vérifier si ce jour a des événements
//       const dayEvents = reservationEvents.filter((event) => {
//         const eventDate = new Date(event.date)
//         return (
//           eventDate.getDate() === i &&
//           eventDate.getMonth() === currentMonth.getMonth() &&
//           eventDate.getFullYear() === currentMonth.getFullYear()
//         )
//       })
//
//       const hasEvent = dayEvents.length > 0
//
//       days.push(
//         <div
//           key={i}
//           className={`calendar-day ${hasEvent ? "has-event" : ""}`}
//           title={hasEvent ? `${dayEvents.length} réservation(s)` : ""}
//         >
//           {i}
//           {hasEvent && <div className="day-event">{dayEvents.length}</div>}
//         </div>,
//       )
//     }
//
//     return (
//       <>
//         <div className="calendar-header">
//           <button className="calendar-nav-button" onClick={prevMonth}>
//             <ChevronLeft className="calendar-nav-icon" />
//           </button>
//           <h3 className="calendar-title">
//             {monthName} {year}
//           </h3>
//           <button className="calendar-nav-button" onClick={nextMonth}>
//             <ChevronRight className="calendar-nav-icon" />
//           </button>
//         </div>
//         <div className="calendar-weekdays">
//           <div>Dim</div>
//           <div>Lun</div>
//           <div>Mar</div>
//           <div>Mer</div>
//           <div>Jeu</div>
//           <div>Ven</div>
//           <div>Sam</div>
//         </div>
//         <div className="calendar-days">{days}</div>
//       </>
//     )
//   }
//
//   // Trouver la valeur maximale pour l'échelle du graphique
//   const getMaxValue = () => {
//     if (historicalData.users.length === 0 && historicalData.teams.length === 0) return 100
//     const maxUsers = Math.max(...historicalData.users)
//     const maxTeams = Math.max(...historicalData.teams)
//     return Math.max(maxUsers, maxTeams, 10) // Au moins 10 pour éviter une échelle trop petite
//   }
//
//   const maxValue = getMaxValue()
//
//   return (
//     <div className="admin-overview">
//       <Sidebar/>
//       <main className="content">
//         <div className="header">
//           <div className="header-text">
//             <h1>Vue d'ensemble</h1>
//             <p className="header-description">Consultez les statistiques et les performances de votre plateforme</p>
//           </div>
//           <button
//             className={`refresh-button ${refreshing ? "refreshing" : ""}`}
//             onClick={fetchStats}
//             disabled={refreshing}
//           >
//             <RefreshCw className={`refresh-icon ${refreshing ? "spinning" : ""}`} />
//             Actualiser
//           </button>
//         </div>
//
//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : (
//           <>
//             <div className="stats-grid">
//               <StatCard
//                 title="Tournois"
//                 value={stats.tournaments}
//                 icon={<Trophy className="stat-icon" />}
//                 loading={loading}
//                 iconColor="amber-icon"
//                 bgColor="amber-bg"
//               />
//               <StatCard
//                 title="Équipes"
//                 value={stats.teams}
//                 icon={<Users className="stat-icon" />}
//                 loading={loading}
//                 iconColor="blue-icon"
//                 bgColor="blue-bg"
//               />
//               <StatCard
//                 title="Utilisateurs"
//                 value={stats.users}
//                 icon={<UserCircle className="stat-icon" />}
//                 loading={loading}
//                 iconColor="green-icon"
//                 bgColor="green-bg"
//               />
//               <StatCard
//                 title="Réservations"
//                 value={stats.reservations}
//                 icon={<Calendar className="stat-icon" />}
//                 loading={loading}
//                 iconColor="purple-icon"
//                 bgColor="purple-bg"
//               />
//             </div>
//
//             <div className="dashboard-grid">
//               <div className="chart-card">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <BarChart3 className="card-title-icon" />
//                     Évolution des utilisateurs et équipes
//                   </h3>
//                   <p className="card-description">Croissance au fil du temps (12 derniers mois)</p>
//                 </div>
//                 <div className="card-content">
//                   {loading ? (
//                     <div className="skeleton-container">
//                       <div className="skeleton chart-skeleton"></div>
//                     </div>
//                   ) : historicalData.labels.length > 0 ? (
//                     <div className="chart-container">
//                       <div className="chart-legend">
//                         <div className="legend-item">
//                           <div className="legend-color users-color"></div>
//                           <span>Utilisateurs</span>
//                         </div>
//                         <div className="legend-item">
//                           <div className="legend-color teams-color"></div>
//                           <span>Équipes</span>
//                         </div>
//                       </div>
//                       <div className="chart">
//                         <div className="chart-y-axis">
//                           <div>{maxValue}</div>
//                           <div>{Math.round(maxValue * 0.75)}</div>
//                           <div>{Math.round(maxValue * 0.5)}</div>
//                           <div>{Math.round(maxValue * 0.25)}</div>
//                           <div>0</div>
//                         </div>
//                         <div className="chart-content">
//                           {historicalData.labels.map((month, index) => (
//                             <div key={month} className="chart-column">
//                               <div className="chart-bars">
//                                 <div
//                                   className="chart-bar users-bar"
//                                   style={{ height: `${(historicalData.users[index] / maxValue) * 100}%` }}
//                                   title={`Utilisateurs: ${historicalData.users[index]}`}
//                                 ></div>
//                                 <div
//                                   className="chart-bar teams-bar"
//                                   style={{ height: `${(historicalData.teams[index] / maxValue) * 100}%` }}
//                                   title={`Équipes: ${historicalData.teams[index]}`}
//                                 ></div>
//                               </div>
//                               <div className="chart-label">{month}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="no-data-message">
//                       <BarChart3 className="no-data-icon" />
//                       <p>Aucune donnée historique disponible</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//
//               <div className="calendar-card">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <Calendar className="card-title-icon" />
//                     Calendrier
//                   </h3>
//                   <p className="card-description">Réservations du mois</p>
//                 </div>
//                 <div className="card-content">
//                   {loading ? (
//                     <div className="skeleton-container">
//                       <div className="skeleton calendar-header-skeleton"></div>
//                       <div className="skeleton calendar-weekdays-skeleton"></div>
//                       <div className="skeleton calendar-days-skeleton"></div>
//                     </div>
//                   ) : (
//                     <div className="calendar-container">{renderCalendar()}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   )
// }
//
// const StatCard = ({ title, value, icon, loading, iconColor, bgColor }) => {
//   return (
//     <div className="stat-card">
//       {loading ? (
//         <div className="skeleton-container">
//           <div className="skeleton title-skeleton"></div>
//           <div className="skeleton value-skeleton"></div>
//         </div>
//       ) : (
//         <>
//           <div className="stat-header">
//             <p className="stat-title">{title}</p>
//             <div className={`stat-icon-container ${bgColor}`}>
//               <div className={`${iconColor}`}>{icon}</div>
//             </div>
//           </div>
//           <div className="stat-content">
//             <h3 className="stat-value">{value}</h3>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }
//
// export default AdminOverview;
//
// import { useState, useEffect } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import { Trophy, Users, UserCircle, Calendar, RefreshCw, BarChart3, ChevronLeft, ChevronRight, PlusCircle, X } from "lucide-react";
// import { getAllTournaments } from "../../services/api/tournamentApi";
// import { getAllEquipes } from "../../services/api/teamApi";
// import { getAllUsers } from "../../services/api/userApi";
// import { getAllReservations, createReservation } from "../../services/api/reservationApi";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./AdminOverview.css";
//
// // Enregistrer les composants Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
//
// const AdminOverview = () => {
//   const [stats, setStats] = useState({
//     tournaments: 0,
//     teams: 0,
//     users: 0,
//     reservations: 0,
//   });
//   const [historicalData, setHistoricalData] = useState({
//     users: [],
//     teams: [],
//     labels: [],
//   });
//   const [reservationEvents, setReservationEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newReservation, setNewReservation] = useState({
//     title: "",
//     date: "",
//   });
//
//   // Fonction pour organiser les données historiques par mois
//   const organizeDataByMonth = (data, dateField) => {
//     const monthlyData = {};
//     const now = new Date();
//
//     // Initialiser les 12 derniers mois avec des valeurs à 0
//     for (let i = 11; i >= 0; i--) {
//       const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
//       const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
//       monthlyData[monthKey] = 0;
//     }
//
//     // Compter les éléments par mois de création
//     data.forEach((item) => {
//       const date = new Date(item[dateField]);
//       const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
//
//       if (monthlyData[monthKey] !== undefined) {
//         monthlyData[monthKey]++;
//       }
//     });
//
//     const labels = Object.keys(monthlyData).map((key) => {
//       const [year, month] = key.split("-");
//       return new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1).toLocaleString("fr-FR", { month: "short" });
//     });
//
//     return {
//       values: Object.values(monthlyData),
//       labels,
//     };
//   };
//
//   // Fonction pour organiser les réservations en événements de calendrier
//   const organizeReservationsAsEvents = (reservations) => {
//     return reservations.map((reservation) => {
//       const date = new Date(reservation.date || reservation.createdAt);
//       return {
//         id: reservation.id,
//         date,
//         title: reservation.title || "Réservation",
//         type: "reservation",
//       };
//     });
//   };
//
//   const fetchStats = async () => {
//     try {
//       setRefreshing(true);
//
//       const [tournaments, teams, users, reservations] = await Promise.all([
//         getAllTournaments(),
//         getAllEquipes(),
//         getAllUsers(),
//         getAllReservations(),
//       ]);
//
//       setStats({
//         tournaments: tournaments.length,
//         teams: teams.length,
//         users: users.length,
//         reservations: reservations.length,
//       });
//
//       const usersData = organizeDataByMonth(users, "createdAt");
//       const teamsData = organizeDataByMonth(teams, "createdAt");
//
//       setHistoricalData({
//         users: usersData.values,
//         teams: teamsData.values,
//         labels: usersData.labels,
//       });
//
//       setReservationEvents(organizeReservationsAsEvents(reservations));
//       setError(null);
//     } catch (err) {
//       console.error("Erreur lors de la récupération des statistiques :", err);
//       setError("Impossible de charger les statistiques. Veuillez vérifier votre connexion ou réessayer plus tard.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
//
//   useEffect(() => {
//     fetchStats();
//   }, []);
//
//   // Gestion du formulaire de réservation
//   const handleReservationSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createReservation(newReservation);
//       setModalVisible(false);
//       setNewReservation({ title: "", date: "" });
//       fetchStats(); // Rafraîchir les données après ajout
//     } catch (err) {
//       console.error("Erreur lors de la création de la réservation :", err);
//       setError("Erreur lors de la création de la réservation.");
//     }
//   };
//
//   // Fonctions pour le calendrier
//   const getDaysInMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   };
//
//   const getFirstDayOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//   };
//
//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   };
//
//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   };
//
//   const renderCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentMonth);
//     const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
//     const monthName = currentMonth.toLocaleString("fr-FR", { month: "long" });
//     const year = currentMonth.getFullYear();
//
//     const days = [];
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }
//
//     for (let i = 1; i <= daysInMonth; i++) {
//       const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
//       const dayEvents = reservationEvents.filter((event) => {
//         const eventDate = new Date(event.date);
//         return (
//           eventDate.getDate() === i &&
//           eventDate.getMonth() === currentMonth.getMonth() &&
//           eventDate.getFullYear() === currentMonth.getFullYear()
//         );
//       });
//
//       const hasEvent = dayEvents.length > 0;
//
//       days.push(
//         <div
//           key={i}
//           className={`calendar-day ${hasEvent ? "has-event" : ""}`}
//           title={hasEvent ? `${dayEvents.length} réservation(s)` : ""}
//         >
//           {i}
//           {hasEvent && <div className="day-event">{dayEvents.length}</div>}
//         </div>
//       );
//     }
//
//     return (
//       <>
//         <div className="calendar-header">
//           <button className="calendar-nav-button" onClick={prevMonth}>
//             <ChevronLeft className="calendar-nav-icon" />
//           </button>
//           <h3 className="calendar-title">
//             {monthName} {year}
//           </h3>
//           <button className="calendar-nav-button" onClick={nextMonth}>
//             <ChevronRight className="calendar-nav-icon" />
//           </button>
//         </div>
//         <div className="calendar-weekdays">
//           <div>Dim</div>
//           <div>Lun</div>
//           <div>Mar</div>
//           <div>Mer</div>
//           <div>Jeu</div>
//           <div>Ven</div>
//           <div>Sam</div>
//         </div>
//         <div className="calendar-days">{days}</div>
//       </>
//     );
//   };
//
//   // Configuration du graphique
//   const chartData = {
//     labels: historicalData.labels,
//     datasets: [
//       {
//         label: "Utilisateurs",
//         data: historicalData.users,
//         backgroundColor: "#3b82f6",
//         borderColor: "#2563eb",
//         borderWidth: 1,
//       },
//       {
//         label: "Équipes",
//         data: historicalData.teams,
//         backgroundColor: "#10b981",
//         borderColor: "#0d9f6e",
//         borderWidth: 1,
//       },
//     ],
//   };
//
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Mois",
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Nombre",
//         },
//         beginAtZero: true,
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           font: {
//             size: 12,
//           },
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return context.dataset.label + ": " + context.raw;
//           },
//         },
//       },
//     },
//   };
//
//   return (
//     <div className="admin-overview">
//       <Sidebar />
//       <main className="content">
//         <div className="header">
//           <div className="header-text">
//             <h1>Vue d'ensemble</h1>
//             <p className="header-description">Consultez les statistiques et les performances de votre plateforme</p>
//           </div>
//           <div className="header-actions">
//             <button
//               className={`refresh-button ${refreshing ? "refreshing" : ""}`}
//               onClick={fetchStats}
//               disabled={refreshing}
//             >
//               <RefreshCw className={`refresh-icon ${refreshing ? "spinning" : ""}`} />
//               Actualiser
//             </button>
//             <button className="add-button" onClick={() => setModalVisible(true)}>
//               <PlusCircle className="icon" />
//               Ajouter une réservation
//             </button>
//           </div>
//         </div>
//
//         {/* Modal pour ajouter une réservation */}
//         {modalVisible && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h3 className="modal-title">Ajouter une réservation</h3>
//                 <button onClick={() => setModalVisible(false)} className="modal-close">
//                   <X size={20} />
//                 </button>
//               </div>
//               <form onSubmit={handleReservationSubmit} className="modal-form">
//                 <div className="form-group">
//                   <label htmlFor="title">Titre</label>
//                   <input
//                     id="title"
//                     type="text"
//                     value={newReservation.title}
//                     onChange={(e) => setNewReservation({ ...newReservation, title: e.target.value })}
//                     required
//                     placeholder="Entrez le titre de la réservation"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="date">Date</label>
//                   <input
//                     id="date"
//                     type="date"
//                     value={newReservation.date}
//                     onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="form-buttons">
//                   <button type="button" className="cancel-button" onClick={() => setModalVisible(false)}>
//                     Annuler
//                   </button>
//                   <button type="submit" className="submit-button">
//                     Créer Réservation
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//
//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : (
//           <>
//             <div className="stats-grid">
//               <StatCard
//                 title="Tournois"
//                 value={stats.tournaments}
//                 icon={<Trophy className="stat-icon" />}
//                 loading={loading}
//                 iconColor="amber-icon"
//                 bgColor="amber-bg"
//               />
//               <StatCard
//                 title="Équipes"
//                 value={stats.teams}
//                 icon={<Users className="stat-icon" />}
//                 loading={loading}
//                 iconColor="blue-icon"
//                 bgColor="blue-bg"
//               />
//               <StatCard
//                 title="Utilisateurs"
//                 value={stats.users}
//                 icon={<UserCircle className="stat-icon" />}
//                 loading={loading}
//                 iconColor="green-icon"
//                 bgColor="green-bg"
//               />
//               <StatCard
//                 title="Réservations"
//                 value={stats.reservations}
//                 icon={<Calendar className="stat-icon" />}
//                 loading={loading}
//                 iconColor="purple-icon"
//                 bgColor="purple-bg"
//               />
//             </div>
//
//             <div className="dashboard-grid">
//               <div className="chart-card">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <BarChart3 className="card-title-icon" />
//                     Évolution des utilisateurs et équipes
//                   </h3>
//                   <p className="card-description">Croissance au fil du temps (12 derniers mois)</p>
//                 </div>
//                 <div className="card-content">
//                   {loading ? (
//                     <div className="skeleton-container">
//                       <div className="skeleton chart-skeleton"></div>
//                     </div>
//                   ) : historicalData.labels.length > 0 ? (
//                     <div className="chart-container">
//                       <Bar data={chartData} options={chartOptions} />
//                     </div>
//                   ) : (
//                     <div className="no-data-message">
//                       <BarChart3 className="no-data-icon" />
//                       <p>Aucune donnée historique disponible</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//
//               <div className="calendar-card">
//                 <div className="card-header">
//                   <h3 className="card-title">
//                     <Calendar className="card-title-icon" />
//                     Calendrier
//                   </h3>
//                   <p className="card-description">Réservations du mois</p>
//                 </div>
//                 <div className="card-content">
//                   {loading ? (
//                     <div className="skeleton-container">
//                       <div className="skeleton calendar-header-skeleton"></div>
//                       <div className="skeleton calendar-weekdays-skeleton"></div>
//                       <div className="skeleton calendar-days-skeleton"></div>
//                     </div>
//                   ) : (
//                     <div className="calendar-container">{renderCalendar()}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };
//
// const StatCard = ({ title, value, icon, loading, iconColor, bgColor }) => {
//   return (
//     <div className="stat-card">
//       {loading ? (
//         <div className="skeleton-container">
//           <div className="skeleton title-skeleton"></div>
//           <div className="skeleton value-skeleton"></div>
//         </div>
//       ) : (
//         <>
//           <div className="stat-header">
//             <p className="stat-title">{title}</p>
//             <div className={`stat-icon-container ${bgColor}`}>
//               <div className={`${iconColor}`}>{icon}</div>
//             </div>
//           </div>
//           <div className="stat-content">
//             <h3 className="stat-value">{value}</h3>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
//
// export default AdminOverview;


import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  Trophy,
  Users,
  UserCircle,
  Calendar,
  RefreshCw,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  X,
  Search,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { getAllTournaments } from "../../services/api/tournamentApi";
import { getAllEquipes } from "../../services/api/teamApi";
import { getAllUsers } from "../../services/api/userApi";
import { getAllReservations, createReservation } from "../../services/api/reservationApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./AdminOverview.css";

// Enregistrer les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Toast = ({ message, type, onClose }) => (
  <div className={`toast ${type}`}>
    {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    <p>{message}</p>
    <button onClick={onClose} className="toast-close">
      <X size={16} />
    </button>
  </div>
);

const AdminOverview = () => {
  const [stats, setStats] = useState({
    tournaments: 0,
    teams: 0,
    users: 0,
    reservations: 0,
  });
  const [historicalData, setHistoricalData] = useState({
    users: [],
    teams: [],
    labels: [],
  });
  const [reservationEvents, setReservationEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [newReservation, setNewReservation] = useState({
    title: "",
    date: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const organizeDataByMonth = (data, dateField) => {
    const monthlyData = {};
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlyData[monthKey] = 0;
    }

    data.forEach((item) => {
      const date = new Date(item[dateField]);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (monthlyData[monthKey] !== undefined) monthlyData[monthKey]++;
    });

    const labels = Object.keys(monthlyData).map((key) => {
      const [year, month] = key.split("-");
      return new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1).toLocaleString("fr-FR", { month: "short" });
    });

    return { values: Object.values(monthlyData), labels };
  };

  const organizeReservationsAsEvents = (reservations) => {
    return reservations.map((reservation) => {
      const date = new Date(reservation.date || reservation.createdAt);
      return { id: reservation.id, date, title: reservation.title || "Réservation", type: "reservation" };
    });
  };

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const [tournaments, teams, users, reservations] = await Promise.all([
        getAllTournaments(),
        getAllEquipes(),
        getAllUsers(),
        getAllReservations(),
      ]);

      setStats({
        tournaments: tournaments.length,
        teams: teams.length,
        users: users.length,
        reservations: reservations.length,
      });

      const usersData = organizeDataByMonth(users, "createdAt");
      const teamsData = organizeDataByMonth(teams, "createdAt");

      setHistoricalData({
        users: usersData.values,
        teams: teamsData.values,
        labels: usersData.labels,
      });

      setReservationEvents(organizeReservationsAsEvents(reservations));
      setError(null);
      showToast('Données chargées avec succès', 'success');
    } catch (err) {
      console.error("Erreur lors de la récupération des statistiques :", err);
      setError("Impossible de charger les statistiques. Veuillez réessayer.");
      showToast('Erreur lors du chargement des données', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReservation(newReservation);
      setModalVisible(false);
      setNewReservation({ title: "", date: "" });
      fetchStats();
      showToast('Réservation ajoutée avec succès', 'success');
    } catch (err) {
      console.error("Erreur lors de la création de la réservation :", err);
      showToast('Erreur lors de la création de la réservation', 'error');
    }
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const monthName = currentMonth.toLocaleString("fr-FR", { month: "long" });
    const year = currentMonth.getFullYear();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dayEvents = reservationEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === i && eventDate.getMonth() === currentMonth.getMonth() && eventDate.getFullYear() === currentMonth.getFullYear();
      });
      const hasEvent = dayEvents.length > 0;

      days.push(
        <div key={i} className={`calendar-day ${hasEvent ? "has-event" : ""}`} title={hasEvent ? `${dayEvents.length} réservation(s)` : ""}>
          {i}
          {hasEvent && <div className="day-event">{dayEvents.length}</div>}
        </div>
      );
    }

    return (
      <>
        <div className="calendar-header">
          <button className="calendar-nav-button" onClick={prevMonth}>
            <ChevronLeft className="calendar-nav-icon" />
          </button>
          <h3 className="calendar-title">{monthName} {year}</h3>
          <button className="calendar-nav-button" onClick={nextMonth}>
            <ChevronRight className="calendar-nav-icon" />
          </button>
        </div>
        <div className="calendar-weekdays">
          <div>Dim</div><div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div>
        </div>
        <div className="calendar-days">{days}</div>
      </>
    );
  };

  const chartData = {
    labels: historicalData.labels,
    datasets: [
      { label: "Utilisateurs", data: historicalData.users, backgroundColor: "#3b82f6", borderColor: "#2563eb", borderWidth: 1 },
      { label: "Équipes", data: historicalData.teams, backgroundColor: "#10b981", borderColor: "#0d9f6e", borderWidth: 1 },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { title: { display: true, text: "Mois" }, grid: { display: false } }, y: { title: { display: true, text: "Nombre" }, beginAtZero: true, ticks: { stepSize: 1 } } },
    plugins: { legend: { position: "top", labels: { font: { size: 12 } } }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.raw}` } } },
  };

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div className="admin-overview">
      <Sidebar />
      <main className="content">
        <div className="header">
          <div className="header-text">
            <h1>Vue d'ensemble</h1>
            <p className="header-description">Consultez les statistiques et les performances de votre plateforme</p>
          </div>
          <div className="header-actions">

            <button className={`refresh-button ${refreshing ? "refreshing" : ""}`} onClick={fetchStats} disabled={refreshing}>
              <RefreshCw className={`refresh-icon ${refreshing ? "spinning" : ""}`} />
              Actualiser
            </button>

          </div>
        </div>

        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Ajouter une réservation</h3>
                <button onClick={() => setModalVisible(false)} className="modal-close">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleReservationSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="title">Titre</label>
                  <input
                    id="title"
                    type="text"
                    value={newReservation.title}
                    onChange={(e) => setNewReservation({ ...newReservation, title: e.target.value })}
                    required
                    placeholder="Entrez le titre de la réservation"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button type="button" className="cancel-button" onClick={() => setModalVisible(false)}>Annuler</button>
                  <button type="submit" className="submit-button">Créer Réservation</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="stats-grid">
              <StatCard icon={<Trophy className="icon" />} title="Tournois" value={stats.tournaments} iconClass="amber-icon" />
              <StatCard icon={<Users className="icon" />} title="Équipes" value={stats.teams} iconClass="blue-icon" />
              <StatCard icon={<UserCircle className="icon" />} title="Utilisateurs" value={stats.users} iconClass="green-icon" />
              <StatCard icon={<Calendar className="icon" />} title="Réservations" value={stats.reservations} iconClass="purple-icon" />
            </div>

            <div className="dashboard-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3 className="card-title"><BarChart3 className="card-title-icon" /> Évolution des utilisateurs et équipes</h3>
                  <p className="card-description">Croissance au fil du temps (12 derniers mois)</p>
                </div>
                <div className="card-content">
                  {loading ? (
                    <div className="loading-container">
                      <Loader className="spinner" />
                      <p>Chargement...</p>
                    </div>
                  ) : historicalData.labels.length > 0 ? (
                    <div className="chart-container">
                      <Bar data={chartData} options={chartOptions} />
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>Aucune donnée historique disponible</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="calendar-card">
                <div className="card-header">
                  <h3 className="card-title"><Calendar className="card-title-icon" /> Calendrier</h3>
                  <p className="card-description">Réservations du mois</p>
                </div>
                <div className="card-content">
                  {loading ? (
                    <div className="loading-container">
                      <Loader className="spinner" />
                      <p>Chargement...</p>
                    </div>
                  ) : (
                    <div className="calendar-container">{renderCalendar()}</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {toast.visible && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />
        )}
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value, iconClass }) => (
  <div className="stat-card">
    <div className={`stat-icon ${iconClass}`}>{icon}</div>
    <div>
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
  </div>
);

export default AdminOverview;
