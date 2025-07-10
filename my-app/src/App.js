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
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;


// import React, { useState } from 'react';
// import {
//   FaBars,
//   FaChartPie,
//   FaHome,
//   FaChartBar,
//   FaEnvelope,
//   FaCalendarAlt,
//   FaHospital,
//   FaUserFriends,
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
// import logo from './image/hinhanh/cvv.png';
// import './index.css';

// function App() {
//   // Hard-coded user để test giao diện
//   const user = { name: 'Minh Khuê', role: 'Quản lý' };

//   const [page, setPage] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const navItems = [
//     { key: 'dashboard',    icon: <FaChartPie />,    label: 'Bảng điều khiển' },
//     { key: 'home',         icon: <FaHome />,        label: 'Trang chủ' },
//     { key: 'performance',  icon: <FaChartBar />,    label: 'Hiệu suất' },
//     { key: 'notification', icon: <FaEnvelope />,    label: 'Thông báo' },
//     { key: 'appointment',  icon: <FaCalendarAlt />, label: 'Lịch hẹn' },
//     { key: 'medical',      icon: <FaHospital />,    label: 'Sự kiện y tế' },
//     { key: 'users',        icon: <FaUserFriends />, label: 'Quản lí danh sách lớp' },
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
//               <span className="text-xl">{icon}</span>
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
//               /* TODO: logout logic */
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
//             <FaBell
//               className="text-gray-600 text-xl cursor-pointer"
//               title="Thông báo"
//             />
//             <FaCog
//               className="text-gray-600 text-xl cursor-pointer"
//               title="Cài đặt"
//             />
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                 {getInitials(user.name)}
//               </div>
//               <div className="text-right">
//                 <p className="font-medium">{user.name}</p>
//                 <p className="text-sm text-gray-500">{user.role}</p>
//               </div>
//             </div>
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
//           {['home'].includes(page) && (
//             <div className="p-8 text-gray-600">
//               Trang “{navItems.find(i => i.key === page).label}” đang phát triển…
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

















