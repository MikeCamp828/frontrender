import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';
import Pueblos from './Pueblos';
import Reseñas from './Reseñas';
import Register from './Register';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pueblos" element={<Pueblos />} />
          <Route path="/reseñas" element={<Reseñas />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
