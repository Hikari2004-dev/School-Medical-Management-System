// File: StudentProfile.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./StudentProfile.css"; // CSS file for custom styles

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Mock data for demonstration - replace with actual API call later
    const mockStudent = {
      name: "Nguyễn Đoàn Duy Khánh",
      className: "12A1",
      teacher: "Lâm Phương Thúy",
      height: 170,
      weight: 60,
      gender: "Nam/Nữ",
      avatarUrl: "/logo192.png", // Using default logo as avatar
      motherName: "",
      motherPhone: "",
      email: "",
      fatherName: "",
      fatherPhone: "",
      address: ""
    };

    // Simulate API delay
    setTimeout(() => {
      setStudent(mockStudent);
    }, 500);

    // Original API call (commented out for now)
    // axios.get("/api/student-profile/12A1")
    //   .then(res => setStudent(res.data))
    //   .catch(err => console.error("API error:", err));
  }, []);

  if (!student) return <div className="loading">Loading...</div>;

  return (
    <div className="student-profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/logo192.png" alt="logo" className="logo-img" />
          <div className="logo-text">
            <div className="main">SchoMed</div>
            <div className="sub">School Medical</div>
          </div>
        </div>
        <nav className="nav-items">
          <NavItem icon="🏠" text="Trang chủ" link="/" currentPath={location.pathname} />
          <NavItem icon="💊" text="Đơn thuốc" link="/medications" currentPath={location.pathname} />
          <NavItem icon="💉" text="Sổ vaccine" link="/vaccination" currentPath={location.pathname} />
          <NavItem icon="📋" text="Hồ sơ sức khỏe" link="/patient-search" currentPath={location.pathname} />
          <NavItem icon="📄" text="Báo cáo" link="/report" currentPath={location.pathname} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-card">
          <div className="header">
            <div className="header-left">
              <img src={student.avatarUrl} alt="Avatar" className="avatar" />
              <div className="info">
                <h1 className="name">{student.name}</h1>
                <p>Lớp: {student.className} | GVCN: {student.teacher}</p>
                <p>Chiều cao: {student.height}cm | Cân nặng: {student.weight}kg</p>
                <p>Giới tính: {student.gender}</p>
              </div>
            </div>
          </div>

          <div className="tabs">
            <Tab active>Thông tin cá nhân</Tab>
            <Tab>Đơn thuốc</Tab>
            <Tab>Lịch sử tiêm chủng</Tab>
            <Tab>Hồ sơ sức khỏe</Tab>
          </div>

          <div className="personal-section">
            <div className="personal-container">
              <div className="personal-left">
                <div className="personal-item">
                  <strong>Mẹ:</strong>
                  <span>{student.motherName || ""}</span>
                </div>
                <div className="personal-item">
                  <strong>Điện Thoại:</strong>
                  <span>{student.motherPhone || ""}</span>
                </div>
                <div className="personal-item">
                  <strong>Ba:</strong>
                  <span>{student.fatherName || ""}</span>
                </div>
                <div className="personal-item">
                  <strong>Điện Thoại:</strong>
                  <span>{student.fatherPhone || ""}</span>
                </div>
              </div>
              <div className="personal-right">
                <div className="personal-item">
                  <strong>Email:</strong>
                  <span>{student.email || ""}</span>
                </div>
                <div className="personal-item">
                  <strong>Địa chỉ:</strong>
                  <span>{student.address || ""}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, text, link, currentPath }) {
  const isActive = currentPath === link;
  return (
    <Link to={link} className={`nav-item ${isActive ? "active" : ""}`}>
      <span className="icon">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

function Tab({ children, active }) {
  return (
    <div className={`tab ${active ? "active-tab" : ""}`}>
      {children}
    </div>
  );
}
