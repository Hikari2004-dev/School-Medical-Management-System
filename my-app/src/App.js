// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HoiVien from './pages/HoiVien';
import Login from './Login/Login';
import Register from './Register/Register';
import DichVu from './pages/DichVu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hoivien" element={<HoiVien />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dichvu" element={<DichVu />} />
        {/* Thêm các route khác nếu cần */}
        <Route path="*" element={<h1 style={{ textAlign: "center" }}>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
