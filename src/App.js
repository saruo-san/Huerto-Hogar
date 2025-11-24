import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Services
import LocalStorageService from './services/LocalStorageService';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario logueado al cargar la app
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const currentUser = LocalStorageService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error al verificar estado de autenticación:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Manejar login exitoso
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Manejar logout
  const handleLogout = () => {
    try {
      LocalStorageService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Mostrar carga mientras se verifica el estado de autenticación
  if (loading) {
    return (
      <div className="App d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/catalog" element={<Catalog user={user} />} />
          <Route path="/about" element={<About user={user} />} />
          <Route path="/blog" element={<Blog user={user} />} />
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? <Navigate to="/" replace /> : <Register />
            } 
          />
          {/* Ruta para cerrar sesión */}
          <Route 
            path="/logout" 
            element={<LogoutComponent onLogout={handleLogout} />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Componente simple para manejar el logout
const LogoutComponent = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/" replace />;
};

export default App;
