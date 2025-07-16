import React from 'react';
import { Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import MemberPage from './pages/Member/MemberPage';
import News from './pages/News/News';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import NewsTestPage from './pages/NewsTestPage';

import OurServices from './pages/Service/OurServices';
import HealthCheck from './pages/Service/HealthCheck';
import OnlineConsultationPage from './pages/Service/OnlineConsultationPage';
import SendPrescription from './pages/Service/SendPrescription';
import VaccineForm from './pages/Service/VaccineForm';

import StudentProfile from './pages/lookup/personal_Info/StudentProfile'; 
import Medications from './pages/lookup/prescription/Medications';
import Vaccination from './pages/lookup/vaccinehistory/vaccination';
import StudentHealthProfile from './pages/lookup/info/StudentHealthProfile';

import Notification from "./pages/notification/Notification";
import VNPAYPaymentButton from './pages/Member/VNPAYPaymentButton';

import ChatBot from './components/chat/ChatBot';

function UserApp() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/test" element={<NewsTestPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />

        <Route path="/services" element={<OurServices />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route path="/online-consultation" element={<OnlineConsultationPage />} />
        <Route path="/send-prescription" element={<SendPrescription />} />
        <Route path="/vaccine-form" element={<VaccineForm />} />

        <Route path="/patient-search" element={<StudentProfile />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/vaccinations" element={<Vaccination />} />
        <Route path="/health-record" element={<StudentHealthProfile />} />
        <Route path="/student-profile" element={<StudentProfile />} />

        <Route path="/notification" element={<Notification />} />
        <Route path="/payment/vnpay" element={<VNPAYPaymentButton />} />
      </Routes>
      <ChatBot />
    </div>
  );
}

export default UserApp;
