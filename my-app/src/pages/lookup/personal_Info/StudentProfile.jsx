// File: StudentProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentProfile.css"; // CSS file for custom styles

export default function StudentProfile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student profile data from backend
    axios.get("/api/student-profile/12A1") // Example endpoint
      .then(res => setStudent(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  if (!student) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full h-full bg-white font-judson">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/logo.png" alt="logo" className="logo-img" />
          <div className="logo-text">
            <div className="main">SchoMed</div>
            <div className="sub">School Medical</div>
          </div>
        </div>
        <nav className="nav-items">
          <NavItem icon="🏠" text="Trang chủ" />
          <NavItem icon="💊" text="Đơn thuốc" />
          <NavItem icon="💉" text="Sổ vaccine" />
          <NavItem icon="📋" text="Hồ sơ sức khỏe" active />
          <NavItem icon="📄" text="Báo cáo" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <img src={student.avatarUrl} alt="Avatar" className="avatar" />
          <div className="info">
            <h1 className="name">{student.name}</h1>
            <p>Lớp: {student.className} | GVCN: {student.teacher}</p>
            <p>Chiều cao: {student.height}cm | Cân nặng: {student.weight}kg</p>
            <p>Giới tính: {student.gender}</p>
          </div>
          <button className="add-btn">
            <span className="plus">+</span> Thêm mới
          </button>
        </div>

        <div className="tabs">
          <Tab active>Thông tin cá nhân</Tab>
          <Tab>Đơn thuốc</Tab>
          <Tab>Lịch sử tiêm chủng</Tab>
          <Tab>Hồ sơ sức khỏe</Tab>
        </div>

        <div className="personal-section">
          <div className="personal-row">
            <div>
              <strong>Mẹ:</strong> {student.motherName}<br />
              <strong>Điện thoại:</strong> {student.motherPhone}
            </div>
            <div>
              <strong>Email:</strong> {student.email}
            </div>
          </div>
          <div className="personal-row">
            <div>
              <strong>Ba:</strong> {student.fatherName}<br />
              <strong>Điện thoại:</strong> {student.fatherPhone}
            </div>
            <div>
              <strong>Địa chỉ:</strong> {student.address}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, text, active }) {
  return (
    <div className={`nav-item ${active ? "active" : ""}`}>
      <span className="icon">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Tab({ children, active }) {
  return (
    <div className={`tab ${active ? "active-tab" : ""}`}>
      {children}
    </div>
  );
}
