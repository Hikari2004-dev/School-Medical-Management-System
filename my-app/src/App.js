// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HoiVien from './pages/HoiVien';
import DichVu from './pages/DichVu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hoivien" element={<HoiVien />} />
        <Route path="/dichvu" element={<DichVu />} />
      </Routes>
    </Router>
  );
}

export default App;
