import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Para redirigir a otras rutas

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Supongamos que tienes un endpoint de autenticación en tu backend
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso:', response.data);
        alert('Inicio de sesión exitoso');
        navigate('/Pueblos'); // Redirige al buzón después de iniciar sesión
      } else {
        alert('Credenciales incorrectas. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error iniciando sesión:', error.response?.data || error.message);
      alert('Error en el servidor. Intenta nuevamente más tarde.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/Register'); // Redirige a la página de creación de cuenta
  };

  return (
    <div className="login-page">
    <div className="login-container">
      <h1>Inicia Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-3">
        ¿No tienes una cuenta?{' '}
        <button className="btn btn-link" onClick={handleCreateAccount}>
          Crear una cuenta
        </button>
      </p>
    </div>
    </div>
  );
}

export default Login;
