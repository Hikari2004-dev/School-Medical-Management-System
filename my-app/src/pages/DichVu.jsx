// src/pages/DichVu.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GooeyNav from "../hooks/GooeyNav";
import "../hooks/GooeyNav.css";
import "./HomePage.css";
import LogoImg from "../image/14 1.png";
import ClickSpark from "../hooks/ClickSpark";
import SplitText from "../hooks/SplitText";
import DichVuBanner from "../image/dichvubanner.png";

function DichVu() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/" },
    { label: "Hội viên", href: "/hoivien" },
    { label: "Dịch vụ", href: "/dichvu" },
    { label: "Tra cứu", href: "#search" },
  ];

  const services = [
    {
      title: "Gửi Đơn Thuốc",
      desc: "Gửi đơn thuốc trực tuyến nhanh chóng và tiện lợi. Hệ thống tự động xử lý và thông báo kết quả trong vòng 24h.",
      button: "Gửi Đơn Thuốc",
    },
    {
      title: "Đăng Ký Tiêm Vaccine",
      desc: "Đăng ký lịch tiêm vaccine và nhận thông báo nhắc nhở. Theo dõi lịch sử tiêm chủng đầy đủ và chính xác.",
      button: "Đăng Ký Vaccine",
    },
    {
      title: "Khám Sức Khỏe Định Kỳ",
      desc: "Đặt lịch khám sức khỏe định kỳ với các bác sĩ chuyên khoa. Nhận nhắc nhở và theo dõi kết quả khám.",
      button: "Đặt Lịch Khám",
    },
    {
      title: "Tư Vấn Trực Tuyến",
      desc: "Truyền thông sức khỏe trực tuyến với đội ngũ bác sĩ chuyên nghiệp. Hỗ trợ 24/7 qua chat, video call.",
      button: "Tư Vấn Ngay",
    },
  ];

  return (
    <ClickSpark
      sparkColor="black"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={12}
      duration={500}
    >
      <div className="page-container" style={{ backgroundColor: "#fff" }}>
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

        <div style={{ position: "relative", marginBottom: "2rem" }}>
          <GooeyNav
            items={navItems}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={3}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        <section
          className="medical-banner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundImage: `url(${DichVuBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            padding: "4rem 2rem",
            height: "370px",
            color: "#000",
          }}
          data-aos="fade-up"
        >
          <div
            style={{
              padding: "2rem",
              borderRadius: "1rem",
              maxWidth: "500px",
              marginLeft: "3rem",
            }}
          >
            <h2
              style={{ color: "#1e40af", fontSize: "2rem", fontWeight: "bold" }}
            >
              DỊCH VỤ Y TẾ TOÀN DIỆN
            </h2>
            <p style={{ fontSize: "1.1rem", margin: "1rem 0" }}>
              Khám phá và tận hưởng sự tiện lợi của dịch vụ y tế tại SchoMed
            </p>
            <p>
              Liên hệ <strong>chuyên gia</strong> để tư vấn thêm
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                margin: "1rem 0",
              }}
            >
              <a
                href="tel:1900-1159"
                style={{
                  background: "#1e40af",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                📞 1900-1159
              </a>
              <span>hoặc</span>
              <button
                onClick={() => {
                  const chatWidget = document.querySelector(
                    "#tawkchat-container iframe"
                  );
                  if (chatWidget)
                    chatWidget.contentWindow.postMessage(
                      { type: "toggle" },
                      "*"
                    );
                }}
                style={{
                  background: "#ffb74d",
                  color: "#000",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Chat ngay
              </button>
            </div>
            <a
              href="#services"
              style={{
                background: "#1e40af",
                padding: "0.6rem 1.5rem",
                borderRadius: "2rem",
                color: "#fff",
                fontWeight: "bold",
                display: "inline-block",
                marginTop: "1rem",
                textDecoration: "none",
              }}
            >
              Xem thêm dịch vụ
            </a>
          </div>
        </section>
        <section className="services-section" id="services" data-aos="fade-up">
          <h2 className="section-title">Dịch Vụ y tế của SchoMed</h2>
          <div
            className="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
              padding: "2rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {services.map((svc, i) => (
              <div
                key={i}
                className="service-card"
                style={{
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  borderTop: "5px solid #1e40af",
                  transition: "transform 0.3s",
                }}
                data-aos="zoom-in"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h3 style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: "0.95rem", margin: "1rem 0" }}>
                  {svc.desc}
                </p>
                <button
                  style={{
                    background: "#1e40af",
                    color: "#fff",
                    border: "none",
                    padding: "0.6rem 1rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  {svc.button}
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer" data-aos="fade-up">
          <div className="footer-container">
            <div>
              <div className="footer-title">
                © 2025 SchoolMed – Bảo vệ sức khỏe học sinh, yên tâm cho phụ
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

export default DichVu;
