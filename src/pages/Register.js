import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalStorageService from '../services/LocalStorageService';
import ApiService from '../services/ApiService';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar mensajes cuando el usuario empiece a escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      throw new Error('El nombre es obligatorio');
    }
    if (!formData.apellido.trim()) {
      throw new Error('El apellido es obligatorio');
    }
    if (!formData.correo.trim()) {
      throw new Error('El correo electrónico es obligatorio');
    }
    if (!formData.correo.includes('@') || !formData.correo.includes('.')) {
      throw new Error('Por favor, ingresa un correo electrónico válido');
    }
    if (formData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validar formulario
      validateForm();

      // Preparar datos del usuario
      const userData = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        correo: formData.correo.trim().toLowerCase(),
        password: formData.password
      };

      // Registrar usuario contra el backend
      const regResp = await ApiService.register(userData.nombre, userData.correo, userData.password);
      // Algunos backends devuelven token y user; si no, iniciar sesión automáticamente
      if (regResp?.token && regResp?.user) {
        LocalStorageService.setToken(regResp.token);
        LocalStorageService.setCurrentUser(regResp.user);
        setSuccess('¡Registro exitoso! Ingresando...');
        setTimeout(() => navigate('/'), 800);
      } else {
        // Login automático
        const loginResp = await ApiService.login(userData.correo, userData.password);
        LocalStorageService.setToken(loginResp.token);
        LocalStorageService.setCurrentUser(loginResp.user);
        setSuccess('¡Registro exitoso! Ingresando...');
        setTimeout(() => navigate('/'), 800);
      }
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="register-container">

    <div className="register-box">
      <h2 className="register-title">Registro</h2>

      <form id="register-form" onSubmit={handleSubmit}>

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />

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
          minLength="6"
          required
        />

        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          minLength="6"
          required
        />

        <p className="register-login-text">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>

        <button
          type="submit"
          className="register-btn"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

      </form>

      {error && (
        <p id="error-message" style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </p>
      )}

      {success && (
        <p id="success-message" style={{ color: 'green', marginTop: '10px' }}>
          {success}
        </p>
      )}
    </div>
  </div>
);
};

export default Register;
