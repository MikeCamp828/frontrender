import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reseñas.css';

function Reseñas() {
  const [reseñas, setReseñas] = useState([]); // Lista de reseñas de la BD
  const [pueblos, setPueblos] = useState([]); // Lista de pueblos desde la BD
  const [puebloId, setPuebloId] = useState(''); // Pueblo seleccionado
  const [foto, setFoto] = useState(null);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);

  // Cargar reseñas y pueblos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pueblosResponse = await axios.get('http://localhost:3000/api/pueblos'); // Ruta para obtener pueblos
        setPueblos(pueblosResponse.data);

        const reseñasResponse = await axios.get('http://localhost:3000/api/calificaciones'); // Ruta para obtener reseñas
        setReseñas(reseñasResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear nueva reseña
      const nuevaReseña = {
        user_id: 2, // Cambia esto según el usuario autenticado
        pueblo_id: puebloId,
        rating: calificacion,
        comentario,
      };

      const response = await axios.post('http://localhost:3000/api/calificaciones/calificacion', nuevaReseña); // Ruta para guardar reseñas
      setReseñas([...reseñas, response.data.calificacion]); // Actualizar la lista local

      // Limpiar el formulario
      setPuebloId('');
      setFoto(null);
      setComentario('');
      setCalificacion(5);
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
    }
  };

  return (
    <div className="reseñas-container">
      <h1>Reseñas</h1>
      <form onSubmit={handleSubmit}>
        <label>Pueblo:</label>
        <select
          value={puebloId}
          onChange={(e) => setPuebloId(e.target.value)}
          required
        >
          <option value="">Selecciona un pueblo</option>
          {pueblos.map((pueblo) => (
            <option key={pueblo.pueblo_id} value={pueblo.pueblo_id}>
              {pueblo.nombre}
            </option>
          ))}
        </select>

        <label>Comentario:</label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
        <label>Calificación:</label>
        <input
          type="number"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          min="1"
          max="5"
          required
        />
        <button type="submit">Enviar Reseña</button>
      </form>
      <h2 className="general-reseñas-title">Todas las Reseñas Guardadas</h2>
      <div className="general-reseñas-list">
        {reseñas.length > 0 ? (
          reseñas.map((reseña) => (
            <div key={reseña.calificacion_id} className="reseña-item">
              {reseña.foto && <img src={reseña.foto} alt="Reseña" />}
              <p><strong>Pueblo:</strong> {pueblos.find((p) => p.pueblo_id === reseña.pueblo_id)?.nombre || 'N/A'}</p>
              <p><strong>Comentario:</strong> {reseña.comentario}</p>
              <p><strong>Calificación:</strong> {reseña.rating}/5</p>
            </div>
          ))
        ) : (
          <p>No hay reseñas disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Reseñas;
