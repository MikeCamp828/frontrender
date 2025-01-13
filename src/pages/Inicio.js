import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  return (
    <div className="inicio-container">
      {/* Encabezado con los logos */}
      <header className="header">
        <img src="./images/ipn.png" alt="IPN Logo" className="logo-ipn" />
        <img src="./images/escom.png" alt="ESCOM Logo" className="logo-escom" />
      </header>

      <h1>Magia en la Ruta MX</h1>

      {/* Logo pm con rotación */}
      <img src="./images/pm.png" alt="Logo PM" className="logo logo-pm" />

      {/* Logo logoo con efecto de escala */}
      <img src="./images/logoo.png" alt="Logo del Proyecto" className="logo logo-logoo" />

      <h2>Misión</h2>
      <p>
        Impulsar el turismo sostenible y auténtico en los pueblos mágicos de México,
        conectando a los viajeros con experiencias únicas y enriquecedoras.
      </p>
      
      <h2>Visión</h2>
      <p>
        Convertirnos en la plataforma líder para la planificación de viajes a pueblos mágicos,
        reconocida por su innovación y compromiso con la cultura local.
      </p>
      
      <h2>Valores</h2>
      <ul>
        <li>Compromiso: Dedicación a la promoción y preservación de la cultura y tradiciones locales.</li>
        <li>Inclusión: Fomentar la diversidad y accesibilidad en todas nuestras actividades.</li>
        <li>Innovación: Buscar constantemente nuevas formas de mejorar la experiencia del viajero.</li>
      </ul>
      
      <h2>Instrucciones</h2>
      <p>1. Selecciona tus destinos: Elige los pueblos mágicos que deseas visitar.</p>
      <p>2. Configura tu ruta óptima: Usamos un algoritmo genético que, mediante iteraciones, simula cromosomas para generar una ruta óptima personalizada.</p>
      <p>3. Explora y disfruta: Visualiza tu recorrido, lee reseñas y descubre actividades recomendadas.</p>
      
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate('/login')} // Navegar al login
      >
        Ir al Login
      </button>

      {/* Apartado de redes sociales */}
      <div className="contact-section">
        <h3>Síguenos en redes sociales</h3>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>

      {/* Apartado de integrantes */}
      <div className="integrantes-section">
        <h2>Integrantes del Proyecto</h2>
        <div className="integrante">
          <h3>Estrada Vargas Valeria</h3>
        </div>
        <div className="integrante">
          <h3>González Sánchez Erick Iván</h3>
        </div>
        <div className="integrante">
          <h3>Luna González Gabriel Alexis</h3>
        </div>
        <div className="integrante">
          <h3>Ocampo Porcayo Miguel Ángel</h3>
        </div>
      </div>

      {/* Footer con copyright */}
      <footer className="footer">
        &copy; 2025 Magia en la Ruta MX. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Inicio;
