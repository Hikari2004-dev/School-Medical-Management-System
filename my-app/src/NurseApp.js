// src/NurseApp.js

import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaSignOutAlt,
  FaBell,
  FaCog
} from 'react-icons/fa';

import Performance                 from './Manager/Performance';
import ClassManagement             from './Manager/ClassManagement';
import MedicalEvents               from './Manager/MedicalEvents';
import Notifications               from './Manager/Notifications';
import ConsultationAppointments    from './Manager/ConsultationAppointments';
import MainPage                    from './Manager/MainPage';
import FallAccident                from './Manager/FallAccident';
import DrugManagement              from './Manager/DrugManagement';
import DrugStorage                 from './Manager/DrugStorage';
import StudentList                 from './Manager/StudentList'; // ← đúng đường dẫn

import logo                        from './image/hinhanh/logoproject.png';
import iconHome                    from './image/icon/house3.png';
import iconNotification            from './image/icon/thu.png';
import iconAppointment             from './image/icon/lichhen.png';
import iconMedical                 from './image/icon/medicalevent.png';
import iconUsers                   from './image/icon/user3.png';
import iconIncident                from './image/hinhanh/incident.png';
import iconReport                  from './image/hinhanh/drugs.png';
import iconStorage                 from './image/hinhanh/pharmacy.png';

import './index.css';

export default function NurseApp() {
  const [user, setUser]               = useState(null);
  const [page, setPage]               = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("userName");
    if (role !== "SchoolNurse") {
      window.location.href = "/";
      return;
    }
    setUser({ name: name || 'Chưa rõ', role });
  }, []);

  const navItems = [
    { key: 'home',          icon: iconHome,         label: 'Trang chủ'             },
    { key: 'notification',  icon: iconNotification, label: 'Thông báo'             },
    { key: 'appointment',   icon: iconAppointment,  label: 'Lịch hẹn'              },
    { key: 'medical',       icon: iconMedical,      label: 'Sự kiện y tế'          },
    { key: 'users',         icon: iconUsers,        label: 'Danh sách học sinh'     }, // dùng StudentList
    { key: 'fallincident',  icon: iconIncident,     label: 'Ghi nhận sự cố'        },
    { key: 'drugmanagement',icon: iconReport,       label: 'Quản lý thuốc'         },
    { key: 'drugstorage',   icon: iconStorage,      label: 'Kho thuốc'             },
  ];

  const getInitials = name =>
    name.split(' ').map(n => n[0]).join('') || '?';

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`flex flex-col bg-blue-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <button className="p-4 self-end" onClick={() => setSidebarOpen(o => !o)}>
          <FaBars size={20} />
        </button>
        <div className="flex items-center px-4 mb-6">
          <img src={logo} alt="Logo" className="w-8 h-8"/>
          {sidebarOpen && (
            <div className="ml-2">
              <p className="font-semibold">SchoMed</p>
              <p className="text-xs">School Medical</p>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto pr-1 hide-scrollbar">
          {navItems.map(({ key, icon, label }) => (
            <button
              key={key}
              className={`w-full flex items-center px-4 py-3 ${page===key ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => setPage(key)}
              title={!sidebarOpen ? label : ''}
            >
              <img src={icon} alt={label} className="w-6 h-6"/>
              {sidebarOpen && <span className="ml-4 text-sm font-medium">{label}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto mb-6 flex flex-col items-center">
          <button
            className="p-2 bg-red-500 rounded-full hover:bg-red-600"
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            title="Đăng xuất"
          >
            <FaSignOutAlt className="text-white text-xl"/>
          </button>
          {sidebarOpen && <span className="mt-2 text-sm">Đăng xuất</span>}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <header className="flex items-center justify-end bg-white border-b px-6 py-3">
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-xl"/>
            <FaCog  className="text-gray-600 text-xl"/>
            {!user ? (
              <div className="text-gray-500 text-sm">Đang tải...</div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {getInitials(user.name)}
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          {page === 'home'         && <MainPage />}
          {page === 'notification' && <Notifications />}
          {page === 'appointment'  && <ConsultationAppointments />}
          {page === 'medical'      && <MedicalEvents />}
          {page === 'users'        && <StudentList />}            {/* ← import đúng, tái sử dụng */}
          {page === 'fallincident' && <FallAccident />}
          {page === 'drugmanagement'&& <DrugManagement />}
          {page === 'drugstorage'  && <DrugStorage />}
        </main>
      </div>
    </div>
  );
}
