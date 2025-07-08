import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HoiVien from './pages/HoiVien';
import Login from './Login/Login';
import Register from './Register/Register';
import DichVu from './pages/DichVu';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import MemberPage from './pages/Member/MemberPage';
import News from './pages/News/News';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import NewsTestPage from './pages/NewsTestPage';
import OurServices from './pages/Service/OurServices';
import ChatBot from './components/chat/ChatBot';
>>>>>>> 68d0830085cf5925e68dea2682d89230a775702a

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hoivien" element={<HoiVien />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dichvu" element={<DichVu />} />
        {/* Thêm các route khác nếu cần */}
        <Route path="*" element={<h1 style={{ textAlign: "center" }}>404 Not Found</h1>} />
      </Routes>
=======
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/test" element={<NewsTestPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/services" element={<OurServices />} />
        </Routes>
        <ChatBot />
      </div>
>>>>>>> 68d0830085cf5925e68dea2682d89230a775702a
    </Router>
  );
}

export default App;
