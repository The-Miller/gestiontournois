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
import "./GerantOverview.css";

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

const GerantOverview = () => {
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

export default GerantOverview;
