import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import MemberPage from './pages/Member/MemberPage';
import News from './pages/News/News';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import NewsTestPage from './pages/NewsTestPage';
import OurServices from './pages/Service/OurServices';
import StudentProfile from './pages/lookup/personal_Info/StudentProfile';
import Medications from './pages/lookup/prescription/medications';
import Vaccination from './pages/lookup/vaccinehistory/vaccination';
import StudentHealthProfile from './pages/lookup/info/StudentHealthProfile';
import ReportPage from './pages/lookup/ReportPage/ReportPage';
import ChatBot from './components/chat/ChatBot';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import ForgetPassword from "./auth/ForgetPassword/ForgetPassword";
import OtpVerification from './auth/OtpVerification/OtpVerification';
import OtpSuccess from './auth/OtpSuccess/OtpSuccess';
import ResetPassword from './auth/ResetPassword/ResetPassword';

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
          <Route path="/patient-search" element={<StudentProfile />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/vaccination" element={<Vaccination />} />
          <Route path="/student-health" element={<StudentHealthProfile />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/otp-success" element={<OtpSuccess />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
