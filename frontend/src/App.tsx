import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
// import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminOverview from './components/Admin/AdminOverview';
import AdminTournaments from './components/Admin/AdminTournaments';
import AdminTeams from './components/Admin/AdminTeams';
import AdminMatches from './components/Admin/AdminMatches';
import AdminUsers from './components/Admin/AdminUsers';
import AdminPosts from './components/Admin/AdminPosts';
import PrivateRoute from './components/Auth/PrivateRoute';
import FilActualite from './components/FilActualite/Fil';
import Contact from './components/Contact/Contact';
import Presentation from './components/Presentation/Presentation';
import Register from './components/Auth/Register';
import CommunityManagerDashboard from './components/CommunityManager/CommunityManagerDashboard';
import CommunityManagerPosts from './components/CommunityManager/CommunityManagerPosts';
import GerantDashboard from './components/Gerant/GerantDashboard';
import GerantOverview from './components/Gerant/GerantOverview';
import GerantTournaments from './components/Gerant/GerantTournaments';
import GerantTeams from './components/Gerant/GerantTeams';
import GerantMatches from './components/Gerant/GerantMatches';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/fil-actualite" element={<FilActualite />} />
        <Route path="/tournois" element={<FilActualite />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/deconnexion" element={<Home />} />

        {/* Route protégée pour les utilisateurs normaux */}
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole={['GERANT']}>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}

        {/* Routes protégées pour les administrateurs */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute requiredRole={['ADMINISTRATEUR']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/overview"
          element={
            <PrivateRoute requiredRole={['ADMINISTRATEUR']}>
              <AdminOverview />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/tournaments"
          element={
            <PrivateRoute requiredRole={['ADMINISTRATEUR']}>
              <AdminTournaments />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/teams"
          element={
            <PrivateRoute requiredRole={['ADMINISTRATEUR']}>
              <AdminTeams />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/matches"
          element={
            <PrivateRoute requiredRole={['ADMINISTRATEUR']}>
              <AdminMatches />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute requiredRole={['ADMINISTRATEUR']}>
              <AdminUsers />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/posts"
          element={
            <PrivateRoute requiredRole={['ADMINISTRATEUR']}>
              <AdminPosts />
            </PrivateRoute>
          }
        />

        {/* Route protégée pour les community managers */}
        <Route
          path="/manager/dashboard"
          element={
            <PrivateRoute requiredRole={['COMMUNITY_MANAGER']}>
              <CommunityManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/posts"
          element={
            <PrivateRoute requiredRole={['COMMUNITY_MANAGER']}>
              <CommunityManagerPosts />
            </PrivateRoute>
          }
        />

        {/* Route protégée pour les gerants */}
        <Route
          path="/gerant/dashboard"
          element={
            <PrivateRoute requiredRole={['GERANT']}>
              <GerantDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/gerant/overview"
          element={
            <PrivateRoute requiredRole={['GERANT']}>
              <GerantOverview />
            </PrivateRoute>
          }
        />
        <Route
          path="/gerant/tournaments"
          element={
            <PrivateRoute requiredRole={['GERANT']}>
              <GerantTournaments />
            </PrivateRoute>
          }
        />
        <Route
          path="/gerant/teams"
          element={
            <PrivateRoute requiredRole={['GERANT']}>
              <GerantTeams />
            </PrivateRoute>
          }
        />
        <Route
          path="/gerant/matches"
          element={
            <PrivateRoute requiredRole={['GERANT']}>
              <GerantMatches />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
