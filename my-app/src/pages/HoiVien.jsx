// src/pages/HoiVien.jsx
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

import ClickSpark from "../hooks/ClickSpark";
import SplitText from "../hooks/SplitText";
import GooeyNav from "../hooks/GooeyNav";
import "../hooks/GooeyNav.css";
import "./HomePage.css";

import LogoImg from "../image/14 1.png";
import DoctorImg from "../image/choray.png"; // bạn cần có ảnh này

function HoiVien() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/news" },
    { label: "Thiết bị y tế", href: "/devices" },
    { label: "Dịch vụ", href: "/services" },
    { label: "Tra cứu", href: "/search" },
  ];

  const basicItems = [
    "Sao lưu hồ sơ sức khoẻ và vaccine",
    "Thông báo phụ huynh",
    "Quản lý cho nhiều đối tượng",
    "Cập nhật sức khoẻ học sinh ở trường",
    "GỬi nhắc lịch trình theo giờ",
    "Quản lý gói hội viên tại tài khoản",
  ];

  const premiumItems = [
    "Bao gồm các mục cơ bản",
    "Cung cấp vớ điện tử theo dõi 24/7",
    "Công cụ để tư vấn sức khỏe học sinh",
    "Tùy chỉnh các báo cáo để phù hợp nhà trường",
    "Tích hợp các bài học liên quan sức khỏe",
    "Quản lý gói hội viên tại tài khoản",
  ];

  return (
    <ClickSpark
      sparkColor="black"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={12}
      duration={500}
    >
      <div className="page-container">
        {/* ==== Banner chạy chữ ==== */}
        <div className="notice-banner">
          <SplitText
            text="🩺 Gói quản lý sức khỏe học sinh – Bảo vệ thể chất từ trường học!"
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

        {/* ==== Header ==== */}
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
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
          <div className="header-icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-paper-plane"></i>
            <div className="auth-buttons">
              <a href="checkaccount.html" className="login-link">
                <i className="fa fa-user"></i> Log in
              </a>
              <span className="divider">/</span>
              <a href="checkaccount.html" className="signup-link">
                <i className="fa fa-user"></i> Sign up
              </a>
            </div>
          </div>
        </header>

        {/* ==== Gooey Navigation ==== */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          <GooeyNav
            items={navItems}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={1}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        <section
          className="hoivien-banner"
          style={{
            backgroundColor: "#6366f1",
            color: "white",
            padding: "4rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            borderRadius: "8px",
            margin: "2rem",
            position: "relative",
          }}
        >
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "9999px",
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              Trang Chủ &gt;&gt; Hội Viên
            </div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Gói đăng ký quản lý sức khỏe học sinh
            </h1>
            <p style={{ fontSize: "1.1rem" }}>
              Chọn gói phù hợp với trường học của bạn
            </p>
          </div>
          <div style={{ flex: 1, textAlign: "center", minWidth: "300px" }}>
            <img
              src={DoctorImg}
              alt="Doctor"
              style={{ maxWidth: "250px", height: "auto" }}
            />
          </div>
        </section>

        {/* ==== Các gói hội viên ==== */}
        <section className="subscription-section" data-aos="fade-up">
          <div
            className="plan-container"
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Gói cơ bản */}
            <div
              className="plan-card"
              style={{ backgroundColor: "#bbf7d0" }}
              data-aos="fade-up"
            >
              <h2 style={{ color: "#1e40af" }}>Cơ Bản</h2>
              <p style={{ fontWeight: "bold" }}>550.000 VND / năm</p>
              <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                {basicItems.map((item, i) => (
                  <li key={i} style={{ marginBottom: "10px" }}>
                    <FaCheckCircle
                      style={{ color: "green", marginRight: "8px" }}
                    />{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="subscription-button"
                style={{
                  backgroundColor: "#1e40af",
                  color: "#fff",
                  marginTop: "1rem",
                }}
              >
                Mua ngay
              </button>
            </div>

            {/* Gói mức cao */}
            <div
              className="plan-card"
              style={{ backgroundColor: "#fcdcdc" }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2 style={{ color: "#dc2626" }}>Mức Cao</h2>
              <p style={{ fontWeight: "bold" }}>1.500.000 VND / năm</p>
              <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                {premiumItems.map((item, i) => (
                  <li key={i} style={{ marginBottom: "10px" }}>
                    <FaCheckCircle
                      style={{ color: "green", marginRight: "8px" }}
                    />{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="subscription-button"
                style={{
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  marginTop: "1rem",
                }}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </section>

        {/* ==== Footer ==== */}
        <footer className="footer" data-aos="fade-up">
          <div className="footer-container">
            <div>
              <div className="footer-title">
                © 2025 SchoolMed – Bảo vệ sức khoẻ học sinh, yên tâm cho phụ
                huynh
              </div>
              <div className="footer-item">
                <span className="label">Địa chỉ:</span> Tầng 5, Tòa nhà ABC,
                Q.1, TP. HCM
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
                <a
                  href="https://www.schoolmed.vn"
                  className="footer-link"
                  target="_blank"
                >
                  www.schoolmed.vn
                </a>
              </div>
              <div className="footer-item">
                <span className="label">Facebook:</span>
                <a
                  href="https://fb.com/schoolmedvn"
                  className="footer-link"
                  target="_blank"
                >
                  fb.com/schoolmedvn
                </a>
              </div>
              <div className="footer-item">
                <span className="label">MST:</span> 0123456789 – Cấp bởi Sở KHĐT
                TP. HCM
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}

export default HoiVien;
