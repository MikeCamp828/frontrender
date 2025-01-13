import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Para redirigir a otras rutas

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://magiarender-2.onrender.com/api/auth/register', {
        nombre,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('Registro exitoso:', response.data);
        alert('Cuenta creada exitosamente. ¡Ahora inicia sesión!');
        navigate('/login'); // Redirige al login después de registrarse
      }
    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      alert('Error al registrar la cuenta. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Crea tu Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-control"
            />
          </div>
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
            Registrarse
          </button>
        </form>
        <p className="mt-3">
          ¿Ya tienes una cuenta?{' '}
          <button className="btn btn-link" onClick={() => navigate('/login')}>
            Inicia Sesión
          </button>
        </p>
      </div>
    </div>
    
  );
  
  
}

export default Register;
