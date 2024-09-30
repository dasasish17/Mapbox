import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Card } from 'react-bootstrap';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MapboxExample from './MapboxExample';
import MapboxLine from './MapboxLine'; 
import MapboxPolygon from './MapboxPolygon';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Corrected Route syntax */}
        <Route path="/" element={<MapboxExample />} />
        <Route path="/line" element={<MapboxLine />} />
        <Route path="/layer" element={<MapboxPolygon />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
