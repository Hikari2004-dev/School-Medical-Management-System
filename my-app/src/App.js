import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import MemberPage from './pages/Member/MemberPage';
import News from './pages/News/News';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import NewsTestPage from './pages/NewsTestPage';
import OurServices from './pages/Service/OurServices';
import ChatBot from './components/chat/ChatBot';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;