// src/pages/HoiVien.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheckCircle } from "react-icons/fa";
import ClickSpark from "../hooks/ClickSpark";
import GooeyNav from "../hooks/GooeyNav";
import SplitText from "../hooks/SplitText";
import "../hooks/GooeyNav.css";
import "./HomePage.css";
import DoctorImg from "../image/hoivien.png";
import LogoImg from "../image/14 1.png";
import { useNavigate } from "react-router-dom";

function HoiVien() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const navigate = useNavigate();

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/#news" },
    { label: "Hội viên", href: "/hoivien" },
    { label: "Dịch vụ", href: "/#services" },
    { label: "Tra cứu", href: "/#search" },
  ];

  const basicItems = [
    "Sao lưu hồ sơ sức khoẻ và vaccine",
    "Thông báo phụ huynh",
    "Quản lý cho nhiều đối tượng phụ huynh gửi",
    "Cập nhật sức khỏe học sinh ở trường",
    "Chỉ gửi lịch trình trạng học sinh khi có uống thuốc",
    "Quản lý gói hội viên tại tài khoản",
  ];

  const premiumItems = [
    "Bao gồm các mục ở thường",
    "Cung cấp vớ điện tử 24/7",
    "Gửi nhắc nhở cho phụ huynh nếu cần thiết",
    "Cung cấp các biểu mẫu thống kê",
    "Tích hợp bài học liên quan sức khỏe",
    "Cung cấp các bài hướng dẫn miễn phí",
    "Quản lý gói hội viên tại tài khoản",
  ];

  return (
    <ClickSpark>
      <div
        className="page-container"
        style={{
          backgroundColor: "#F7FAFC",
          minHeight: "100vh",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        {/* 🔵 Banner chạy chữ */}
        <div className="notice-banner">
          <SplitText
            text="🩺 Khám sức khỏe định kỳ cho học sinh – Bảo vệ sức khỏe từ hôm nay!"
            className="notice-text highlight"
            delay={80}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>

        {/* 🔷 Header */}
        <header className="header-main" data-aos="fade-down">
          <div className="logo-section">
            <a href="/">
              <img src={LogoImg} alt="SchoMed Logo" className="logo-img" />
            </a>
            <div>
              <span className="logo-title">SchoMed</span>
              <br />
              <span className="logo-sub">School Medical</span>
            </div>
          </div>
          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Tìm kiếm tin tức, dịch vụ..."
              className="search-input"
            />
            <button type="submit" className="search-button">🔍</button>
          </form>
          <div className="header-icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-paper-plane"></i>
            <div className="auth-buttons">
              <a href="/WebPages/Login.html" className="login-link">
                <i className="fa fa-user"></i> Log in
              </a>
              <span className="divider">/</span>
              <a href="/WebPages/Register.html" className="signup-link">
                <i className="fa fa-user"></i> Sign up
              </a>
            </div>
          </div>
        </header>

        {/* 🔷 Navbar */}
        <div
          style={{
            position: "relative",
            height: "140px",
            background: "linear-gradient(to bottom, #1e40af, transparent)",
            overflow: "visible",
          }}
          data-aos="fade-down"
        >
          <GooeyNav
            items={navItems}
            onItemClick={(href) => navigate(href)}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={2}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* 🔷 Hai gói */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            padding: "0 2rem",
            marginTop: "3rem",
            marginBottom: "5rem",
          }}
        >
          {/* Cơ Bản */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            style={{
              backgroundColor: "#d1fae5",
              color: "#1e3a8a",
              borderRadius: "20px",
              padding: "2rem",
              width: "300px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Cơ Bản</h2>
            <p style={{ color: "#16a34a" }}>phổ thông</p>
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              550.000 VND / năm
            </p>
            <ul style={{ listStyle: "none", padding: 0, color: "#1f2937" }}>
              {basicItems.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                  <FaCheckCircle style={{ color: "green", marginRight: "0.5rem" }} />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/thanhtoan")}
              style={{
                marginTop: "1rem",
                backgroundColor: "#1e40af",
                color: "white",
                padding: "0.5rem 1.2rem",
                border: "none",
                borderRadius: "9999px",
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            >
              Đăng ký ngay 
            </button>
          </div>

          {/* Mức Cao */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "20px",
              padding: "2rem",
              width: "300px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Mức Cao</h2>
            <p style={{ color: "#f43f5e" }}>cao cấp</p>
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              1.500.000 VND / năm
            </p>
            <ul style={{ listStyle: "none", padding: 0, color: "#1f2937" }}>
              {premiumItems.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                  <FaCheckCircle style={{ color: "green", marginRight: "0.5rem" }} />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/thanhtoan")}
              style={{
                marginTop: "1rem",
                backgroundColor: "#1e40af",
                color: "white",
                padding: "0.5rem 1.2rem",
                border: "none",
                borderRadius: "9999px",
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            >
              Đăng ký ngay
            </button>
          </div>
        </div>

        {/* 🔷 Footer */}
        <footer className="footer" data-aos="fade-up">
          <div className="footer-container">
            <div>
              <div className="footer-title">
                © 2025 SchoolMed – Bảo vệ sức khỏe học sinh, yên tâm cho phụ huynh
              </div>
              <div className="footer-item">
                <span className="label">Địa chỉ:</span> Tầng 5, Tòa nhà ABC, Q.1, TP. HCM
              </div>
              <div className="footer-item">
                <span className="label">Email:</span>
                <a href="mailto:info@schoolmed.vn" className="footer-link">
                  info@schoolmed.vn
                </a>
              </div>
              <div className="footer-item">
                <span className="label">Hotline:</span> 1900-1159
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-item">
                <span className="label">Website:</span>
                <a href="https://www.schoolmed.vn" className="footer-link" target="_blank">
                  www.schoolmed.vn
                </a>
              </div>
              <div className="footer-item">
                <span className="label">Facebook:</span>
                <a href="https://fb.com/schoolmedvn" className="footer-link" target="_blank">
                  fb.com/schoolmedvn
                </a>
              </div>
              <div className="footer-item">
                <span className="label">MST:</span> 0123456789 – Cấp bởi Sở KHĐT TP. HCM
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}

export default HoiVien;
