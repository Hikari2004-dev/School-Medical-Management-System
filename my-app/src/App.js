// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import HomePage from './pages/HomePage/HomePage';
// import MemberPage from './pages/Member/MemberPage';
// import News from './pages/News/News';
// import NewsDetail from './pages/NewsDetail/NewsDetail';
// import NewsTestPage from './pages/NewsTestPage';

// import OurServices from './pages/Service/OurServices';
// import HealthCheck from './pages/Service/HealthCheck';
// import OnlineConsultationPage from './pages/Service/OnlineConsultationPage';
// import SendPrescription from './pages/Service/SendPrescription';
// import VaccineForm from './pages/Service/VaccineForm';

// import StudentProfile from './pages/lookup/personal_Info/StudentProfile';
// import Medications from './pages/lookup/prescription/Medications';
// import Vaccination from './pages/lookup/vaccinehistory/vaccination';
// import StudentHealthProfile from './pages/lookup/info/StudentHealthProfile';

// import ChatBot from './components/chat/ChatBot';
// import Notification from "./pages/notification/Notification";

// import Login from './auth/Login/Login';
// import OtpSuccess from './auth/OtpSuccess/OtpSuccess';
// import ForgetPassword from './auth/ForgetPassword/ForgetPassword';
// import OtpVerification from './auth/OtpVerification/OtpVerification';
// import Register from './auth/Register/Register';
// import ResetPassword from './auth/ResetPassword/ResetPassword';

// import HealthFormApp from './pages/form/healthForm';
// import vaccine from './pages/form/vaccineForm';

// import VNPAYPaymentButton from './pages/Member/VNPAYPaymentButton';
// import Order from './pages/order/order';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/member" element={<MemberPage />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/news/test" element={<NewsTestPage />} />
//           <Route path="/news/:id" element={<NewsDetail />} />

//           {/* Service pages */}
//           <Route path="/services" element={<OurServices />} />
//           <Route path="/health-check" element={<HealthCheck />} />
//           <Route path="/online-consultation" element={<OnlineConsultationPage />} />
//           <Route path="/send-prescription" element={<SendPrescription />} />
//           <Route path="/vaccine-form" element={<VaccineForm />} />

//           {/* Lookup */}
//           <Route path="/patient-search" element={<StudentProfile />} />
//           <Route path="/medications" element={<Medications />} />
//           <Route path="/vaccinations" element={<Vaccination />} />
//           <Route path="/health-record" element={<StudentHealthProfile />} />
//           <Route path="/student-profile" element={<StudentProfile />} />

//           <Route path="/notification" element={<Notification />} />

//           {/* Auth */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/otp-success" element={<OtpSuccess />} />
//           <Route path="/forget-password" element={<ForgetPassword />} />
//           <Route path="/otp-verification" element={<OtpVerification />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* Payment */}
//           <Route path="/payment/vnpay" element={<VNPAYPaymentButton />} />
//           <Route path="/health-form" element={<HealthFormApp />} />
//           <Route path="/vaccine" element={<vaccine />} />
//           <Route path="/order" element={<Order />} />

//           {/* Thêm các route khác nếu cần */}
//         </Routes>
//         <ChatBot />
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   FaBars,
//   FaSignOutAlt,
//   FaBell,
//   FaCog,
// } from 'react-icons/fa';

// import Dashboard from './Manager/Dashboard';
// import Performance from './Manager/Performance';
// import ClassManagement from './Manager/ClassManagement';
// import MedicalEvents from './Manager/MedicalEvents';
// import Notifications from './Manager/Notifications';
// import ConsultationAppointments from './Manager/ConsultationAppointments';
// import MainPage from './Manager/MainPage';

// import logo from './image/hinhanh/logoproject.png';

// // Icon images
// import iconDashboard from './image/icon/dashboard.png';
// import iconHome from './image/icon/house3.png';
// import iconPerformance from './image/icon/hieusuat.png';
// import iconNotification from './image/icon/thu.png';
// import iconAppointment from './image/icon/lichhen.png';
// import iconMedical from './image/icon/medicalevent.png';
// import iconUsers from './image/icon/user3.png';

// import './index.css';

// function App() {
//   const [user, setUser] = useState(null);
//   const [page, setPage] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     axios
//       .get('/api/account/me')
//       .then(response => setUser(response.data))
//       .catch(error => {
//         console.error('Lỗi khi lấy thông tin người dùng:', error);
//         setUser({ name: 'Không rõ', role: 'Không rõ' });
//       });
//   }, []);

//   const navItems = [
//     { key: 'dashboard',    icon: iconDashboard,    label: 'Bảng điều khiển' },
//     { key: 'home',         icon: iconHome,         label: 'Trang chủ' },
//     { key: 'performance',  icon: iconPerformance,  label: 'Hiệu suất' },
//     { key: 'notification', icon: iconNotification, label: 'Thông báo' },
//     { key: 'appointment',  icon: iconAppointment,  label: 'Lịch hẹn' },
//     { key: 'medical',      icon: iconMedical,      label: 'Sự kiện y tế' },
//     { key: 'users',        icon: iconUsers,        label: 'Quản lí danh sách lớp' },
//   ];

//   const getInitials = name =>
//     name.split(' ').map(n => n[0]).join('');

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`flex flex-col bg-blue-800 text-white transition-all duration-300 ${
//           sidebarOpen ? 'w-64' : 'w-20'
//         }`}
//       >
//         {/* Toggle */}
//         <button
//           className="p-4 self-end focus:outline-none"
//           onClick={() => setSidebarOpen(v => !v)}
//         >
//           <FaBars size={20} />
//         </button>

//         {/* Logo */}
//         <div className="flex items-center px-4 mb-6">
//           <img src={logo} alt="SchoMed" className="w-8 h-8" />
//           {sidebarOpen && (
//             <div className="ml-2">
//               <p className="font-semibold">SchoMed</p>
//               <p className="text-xs">School Medical</p>
//             </div>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1">
//           {navItems.map(({ key, icon, label }) => (
//             <button
//               key={key}
//               className={`w-full flex items-center px-4 py-3 transition-colors ${
//                 page === key ? 'bg-blue-600' : 'hover:bg-blue-600'
//               }`}
//               onClick={() => setPage(key)}
//             >
//               <img src={icon} alt={label} className="w-6 h-6" />
//               {sidebarOpen && (
//                 <span className="ml-4 text-sm font-medium">{label}</span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="mt-auto mb-6 flex flex-col items-center">
//           <button
//             className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
//             onClick={() => {
//               // TODO: logout logic
//             }}
//           >
//             <FaSignOutAlt className="text-white text-xl" />
//           </button>
//           {sidebarOpen && <span className="mt-2 text-sm">Đăng xuất</span>}
//         </div>
//       </aside>

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="flex items-center justify-end bg-white border-b px-6 py-3">
//           <div className="flex items-center space-x-4">
//             <FaBell className="text-gray-600 text-xl cursor-pointer" title="Thông báo" />
//             <FaCog className="text-gray-600 text-xl cursor-pointer" title="Cài đặt" />
//             {!user ? (
//               <div className="text-gray-500 text-sm">Đang tải...</div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                   {getInitials(user.name)}
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">{user.name}</p>
//                   <p className="text-sm text-gray-500">{user.role}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 bg-gray-50 overflow-auto">
//           {page === 'dashboard'    && <Dashboard />}
//           {page === 'performance'  && <Performance />}
//           {page === 'notification' && <Notifications />}
//           {page === 'appointment'  && <ConsultationAppointments />}
//           {page === 'users'        && <ClassManagement />}
//           {page === 'medical'      && <MedicalEvents />}
//           {page === 'home'         && <MainPage />}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import ForgetPassword from './auth/ForgetPassword/ForgetPassword';
import ResetPassword from './auth/ResetPassword/ResetPassword';
import OtpSuccess from './auth/OtpSuccess/OtpSuccess';
import OtpVerification from './auth/OtpVerification/OtpVerification';
import VNPAYPaymentButton from './pages/Member/VNPAYPaymentButton';
import ReportPage from './pages/ReportPage/ReportPage';
import Notification from "./pages/notification/Notification";
import AdminApp from './AdminApp';
import UserApp from './UserApp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-success" element={<OtpSuccess />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/report" element={<ReportPage />} />
        {/* Role-based entry points */}
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<UserApp />} />
      </Routes>
    </Router>
  );
}

export default App;






















