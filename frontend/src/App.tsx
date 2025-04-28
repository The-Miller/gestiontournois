// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/Auth/PrivateRoute'; // Import corrigé (sans accolades)
import Presentation from './components/Presentation/Presentation';
import Register from './components/Auth/Register';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/deconnexion" element={<Home />} />
        
        {/* Route protégée pour les utilisateurs normaux */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Route protégée pour les administrateurs */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute requiredRole="Administrateur">
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;