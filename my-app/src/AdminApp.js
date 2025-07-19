// src/AdminApp.js

import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaSignOutAlt,
  FaBell,
  FaCog,
  FaTachometerAlt
} from 'react-icons/fa';

import MedicalEvents      from './Manager/MedicalEvents';
import Notifications      from './Manager/Notifications';
import StudentList        from './Manager/StudentList';
import EventBatchManager  from './Manager/EventBatchManager';

import logo               from './image/hinhanh/logoproject.png';

import iconMedical        from './image/icon/medicalevent.png';
import iconNotification   from './image/icon/thu.png';
import iconUsers          from './image/icon/user3.png';
import iconBatch          from './image/icon/user3.png';

import './index.css';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/dashboard/summary`, { mode: 'cors' })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setSummary)
      .catch(err => setError(err.message));
  }, []);

  if (error)    return <p className="p-6 text-red-500">Lỗi: {error}</p>;
  if (!summary) return <p className="p-6">Đang tải báo cáo...</p>;

  const cards = [
    { label: 'Báo cáo tháng',           value: summary.reportMonth },
    { label: 'Thu nhập',               value: summary.income.toLocaleString() },
    { label: 'Người dùng hôm nay',     value: summary.usersToday },
    { label: 'Khách hàng mới',         value: summary.newCustomers },
    { label: 'Đơn mới',                value: summary.newOrders },
    { label: 'Người dùng hoạt động',   value: summary.activeUsers },
    { label: 'Khai báo thuốc',         value: summary.medicationSubmissions },
    { label: 'Tổng số người dùng',     value: summary.totalUsers }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">{summary.reportTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((c,i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
          >
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [user, setUser]               = useState(null);
  const [page, setPage]               = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("userName");
    if (role !== "Admin") {
      window.location.href = "/";
      return;
    }
    setUser({ name: name || 'Chưa rõ', role: role || 'Không rõ' });
  }, []);

  const navItems = [
    { key: 'dashboard',    icon: <FaTachometerAlt />,  label: 'Thống kê'         },
    { key: 'medical',      icon: iconMedical,           label: 'Sự kiện y tế'      },
    { key: 'notification', icon: iconNotification,      label: 'Thông báo'         },
    { key: 'students',     icon: iconUsers,             label: 'Danh sách học sinh' },
    { key: 'eventbatch',   icon: iconBatch,             label: 'Tạo sự kiện'       }
  ];

  const getInitials = name =>
    name.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex h-screen text-gray-700">
      {/* Sidebar */}
      <aside className={`
        flex flex-col bg-gradient-to-b from-blue-900 to-blue-700 text-white
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-20'}
      `}>
        <button
          className="p-4 self-end focus:outline-none"
          onClick={() => setSidebarOpen(o => !o)}
        >
          <FaBars size={20}/>
        </button>
        <div className="flex items-center px-4 mb-6">
          <img src={logo} alt="Logo" className="w-8 h-8"/>
          {sidebarOpen && (
            <div className="ml-3">
              <p className="text-lg font-bold">SchoMed</p>
              <p className="text-xs">School Medical</p>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto">
          {navItems.map(({ key, icon, label }) => {
            const active = page === key;
            return (
              <button
                key={key}
                className={`
                  w-full flex items-center  
                  px-4 py-3 mb-1
                  ${active
                    ? 'bg-blue-600'
                    : 'hover:bg-blue-500'}
                  transition-colors duration-200
                  focus:outline-none
                `}
                onClick={() => setPage(key)}
                title={!sidebarOpen ? label : ''}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {React.isValidElement(icon)
                    ? icon
                    : <img src={icon} alt={label} className="w-6 h-6"/>}
                </div>
                {sidebarOpen && (
                  <span className="ml-4 text-sm font-medium">{label}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto mb-6 flex flex-col items-center">
          <button
            className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200 focus:outline-none"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            title="Đăng xuất"
          >
            <FaSignOutAlt className="text-white text-xl"/>
          </button>
          {sidebarOpen && <span className="mt-2 text-sm">Đăng xuất</span>}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <header className="flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
          <div></div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-xl hover:text-gray-800 transition-colors"/>
            <FaCog  className="text-gray-600 text-xl hover:text-gray-800 transition-colors"/>
            {!user ? (
              <div className="text-gray-500 text-sm">Đang tải...</div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-medium">{getInitials(user.name)}</span>
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
          {page === 'dashboard'    && <Dashboard />}
          {page === 'medical'      && <MedicalEvents />}
          {page === 'notification' && <Notifications />}
          {page === 'students'     && <StudentList />}
          {page === 'eventbatch'   && <EventBatchManager />}
        </main>
      </div>
    </div>
  );
}
