// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HoiVien from './pages/HoiVien';
<<<<<<< HEAD
import Login from './login/login';
=======
import DichVu from './pages/DichVu';
>>>>>>> c605bcec07dcba7239145b0db022cfb1acaf1919

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hoivien" element={<HoiVien />} />
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
=======
        <Route path="/dichvu" element={<DichVu />} />
>>>>>>> c605bcec07dcba7239145b0db022cfb1acaf1919
      </Routes>
    </Router>
  );
}

export default App;
