<<<<<<< HEAD
<<<<<<< HEAD

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HoiVien from "./pages/HoiVien";

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HoiVien from './pages/HoiVien';
<<<<<<< HEAD
import Login from './login/login';
=======
import DichVu from './pages/DichVu';
<<<<<<< HEAD
>>>>>>> c605bcec07dcba7239145b0db022cfb1acaf1919

=======
<<<<<<< HEAD
    
>>>>>>> 6af5d2ec0fc539cb5b1e3c610902e7f74edd69ab
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
