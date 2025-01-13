import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para navegación
import './Pueblos.css';

function Pueblos() {
  const [step, setStep] = useState(1); // Controla los pasos del flujo
  const [pueblos, setPueblos] = useState([]);
  const [selectedPueblos, setSelectedPueblos] = useState([]);
  const [formData, setFormData] = useState({
    startPueblo: '',
    tipoRuta: 'libre',
    populationSize: 30,
    generations: 100,
    mutationRate: 0.1,
  });
  const [route, setRoute] = useState([]);
  const [distanciaTotal, setDistanciaTotal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPueblos = async () => {
      try {
        const response = await axios.get('https://magiarender-2.onrender.com/api/pueblos');
        setPueblos(response.data);
      } catch (error) {
        console.error('Error fetching pueblos:', error);
      }
    };
    fetchPueblos();
  }, []);

  const handleCheckboxChange = (puebloId) => {
    setSelectedPueblos((prevSelected) => {
      if (prevSelected.includes(puebloId)) {
        return prevSelected.filter((id) => id !== puebloId);
      } else {
        return [...prevSelected, puebloId];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        listaPueblos: selectedPueblos,
        startPueblo: Number(formData.startPueblo),
        tipoRuta: formData.tipoRuta,
        populationSize: Number(formData.populationSize),
        generations: Number(formData.generations),
        mutationRate: parseFloat(formData.mutationRate),
      };
      const response = await axios.post('https://magiarender-2.onrender.com/api/algoritmo/ruta-optima', payload);
      setRoute(response.data.mejorRuta || []);
      setDistanciaTotal(response.data.distanciaTotal || null);
      setStep(3); // Avanzar al paso 3
    } catch (error) {
      console.error('Error fetching optimal route:', error);
    }
  };

  return (
    <div className="pueblos-page">
      <div className="app-container">
        {/* Step 1: Selección de Pueblos */}
        {step === 1 && (
          <div className="step-container step-1">
            <h1 className="text-center">Selecciona los Pueblos Mágicos</h1>
            <div className="row">
              {pueblos.map((pueblo) => (
                <div key={pueblo.pueblo_id} className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      src={`/images/${pueblo.pueblo_id}.jpg`}
                      onError={(e) => {
                        e.target.src = '/images/default.jpg'; // Imagen genérica
                      }}
                      alt={`Imagen de ${pueblo.nombre}`}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pueblo.nombre}</h5>
                      <p className="card-text">{pueblo.descripcion}</p>
                      <label>
                        <input
                          type="checkbox"
                          value={pueblo.pueblo_id}
                          onChange={() => handleCheckboxChange(pueblo.pueblo_id)}
                          className="form-check-input me-2"
                        />
                        Seleccionar
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setStep(2)}
              disabled={selectedPueblos.length === 0}
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Step 2: Configuración */}
        {step === 2 && (
          <div className="step-container step-2">
            <h1 className="text-center">Configura la Ruta</h1>
            <form onSubmit={handleSubmit} className="config-form">
              <div className="form-group">
                <label htmlFor="startPueblo">Pueblo Inicial:</label>
                <select
                  id="startPueblo"
                  name="startPueblo"
                  value={formData.startPueblo}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona un pueblo inicial</option>
                  {selectedPueblos.map((puebloId) => {
                    const pueblo = pueblos.find((p) => p.pueblo_id === puebloId);
                    return (
                      pueblo && (
                        <option key={puebloId} value={puebloId}>
                          {pueblo.nombre}
                        </option>
                      )
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="populationSize">Tamaño de la Población:</label>
                <input
                  type="number"
                  id="populationSize"
                  name="populationSize"
                  value={formData.populationSize}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="generations">Generaciones:</label>
                <input
                  type="number"
                  id="generations"
                  name="generations"
                  value={formData.generations}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mutationRate">Tasa de Mutación:</label>
                <input
                  type="number"
                  step="0.01"
                  id="mutationRate"
                  name="mutationRate"
                  value={formData.mutationRate}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipoRuta">Tipo de Ruta:</label>
                <select
                  id="tipoRuta"
                  name="tipoRuta"
                  value={formData.tipoRuta}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="libre">Libre</option>
                  <option value="cuota">Cuota</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success mt-3">
                Calcular Ruta
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Resultados */}
        {step === 3 && (
          <div className="step-container step-3">
            <h1 className="text-center">Resultados de la Ruta Óptima</h1>
            {route.length > 0 ? (
              <div>
                <h2>Orden de Visita</h2>
                <ol>
                  {route.map((puebloId, index) => {
                    const pueblo = pueblos.find((p) => p.pueblo_id === puebloId);
                    return pueblo ? <li key={`${puebloId}-${index}`}>{pueblo.nombre}</li> : null;
                  })}
                </ol>
                <p>Distancia Total: {distanciaTotal} kilómetros</p>
                <iframe
                  title="Mapa"
                  width="800"
                  height="600"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDTE2VCmlKdIDz_RK5jpyanE9IvDoPculY&origin=${pueblos.find((p) => p.pueblo_id === route[0])?.lat},${pueblos.find((p) => p.pueblo_id === route[0])?.lng}&destination=${pueblos.find((p) => p.pueblo_id === route[route.length - 1])?.lat},${pueblos.find((p) => p.pueblo_id === route[route.length - 1])?.lng}&waypoints=${route
                    .slice(1, -1)
                    .map((puebloId) => {
                      const pueblo = pueblos.find((p) => p.pueblo_id === puebloId);
                      return `${pueblo?.lat},${pueblo?.lng}`;
                    })
                    .join('|')}`}
                ></iframe>
                <button
                  className="btn-resenas"
                  onClick={() => navigate('/Reseñas')}
                >
                  Ir a Reseñas
                </button>
              </div>
            ) : (
              <p>No se pudo calcular la ruta. Intenta nuevamente.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pueblos;
