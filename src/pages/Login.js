import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalStorageService from '../services/LocalStorageService';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validaciones básicas
      if (!formData.correo || !formData.password) {
        throw new Error('Por favor, completa todos los campos');
      }

      if (!formData.correo.includes('@')) {
        throw new Error('Por favor, ingresa un correo electrónico válido');
      }

      // Intentar iniciar sesión usando localStorage
      const result = LocalStorageService.loginUser(formData.correo, formData.password);
      
      if (result.success) {
        // Notificar al componente padre sobre el login exitoso
        if (onLogin) {
          onLogin(result.user);
        }
        
        // Redirigir al inicio
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-wrapper">

    <div className="login-box">
      <h2 className="login-title">Iniciar Sesión</h2>

      <form id="login-form" onSubmit={handleSubmit}>

        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {error && (
        <p id="error-message" style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </p>
      )}
    </div>

    <div className="login-side-box">
      <h2>¿Eres nuevo en Huerto Hogar?</h2>
      <p>
        Al registrarte, podrás agilizar tu proceso de compra. Edita tus datos,
        añade varias direcciones, revisa y realiza un seguimiento de tus pedidos y mucho más.
      </p>
      <a href="/register" className="side-register-btn">
        Registrarse
      </a>
    </div>

  </div>
);
};

export default Login;
