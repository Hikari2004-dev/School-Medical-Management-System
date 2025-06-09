// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import ClickSpark from "../hooks/ClickSpark";
import SplitText from "../hooks/SplitText";
import GooeyNav from "../hooks/GooeyNav";
import "../hooks/GooeyNav.css";
import "./HomePage.css";

import LogoImg from "../image/14 1.png";
import Img1 from "../image/1.png";
import Img2 from "../image/2.png";
import Img3 from "../image/3.png";
import Img4 from "../image/4.png";
import BvNhiDong from "../image/bvnhidong.png";
import ChoRay from "../image/choray1.png";
import DaKhoa from "../image/dakhoa.png";
import DHYDuoc from "../image/dhyduoc.png";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 800, once: false }); // Cho phép animate lại khi cuộn
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % 4;
        AOS.refresh(); // Làm mới AOS khi chuyển slide
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "#news" },
    { label: "Hội viên", href: "/hoivien" },
    { label: "Dịch vụ", href: "#services" },
    { label: "Tra cứu", href: "#search" },
  ];

  return (
    <ClickSpark
      sparkColor="black"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={12}
      duration={500}
    >
      <div
        className="page-container"
        style={{
          fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
        }}
      >
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
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        <div className="slideshow-container" data-aos="zoom-in">
          <div className="slideshow-wrapper">
            {[Img1, Img2, Img3, Img4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className={`slideshow-img ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="slideshow-indicators">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`dot ${currentSlide === i ? "active" : ""}`}
                onClick={() => setCurrentSlide(i)}
                style={{ cursor: "pointer" }}
              ></span>
            ))}
          </div>
        </div>

        <section className="partner-section" data-aos="fade-up">
          <h2 className="partner-title">ĐƯỢC TIN TƯỞNG HỢP TÁC VÀ ĐỒNG HÀNH</h2>
          <div className="partner-logos">
            {[
              { name: "Bệnh viện Đa Khoa", image: DaKhoa },
              { name: "Đại học Y Dược TP.HCM", image: DHYDuoc },
              { name: "Bệnh viện Nhi Đồng", image: BvNhiDong },
              { name: "Bệnh viện Chợ Rẫy", image: ChoRay },
            ].map((partner, i) => (
              <div className="partner-item" key={i} data-aos="fade-up">
                <img src={partner.image} alt={partner.name} />
                <p>{partner.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-section" data-aos="fade-up">
          <h2 className="section-title">THỐNG KÊ</h2>
          <div className="stats-grid">
            {[
              { end: 500, label: "Lượt khám" },
              { end: 10, label: "Cơ sở Y tế" },
              { end: 10, label: "Bệnh viện" },
              { end: 100, label: "Bác sĩ" },
              { end: 550, label: "Lượt truy cập tháng" },
              { end: 10200, label: "Lượt truy cập trong ngày" },
            ].map((item, i) => (
              <div className="stat-item" key={i} data-aos="fade-up">
                <h3>
                  <CountUp end={item.end} duration={2} enableScrollSpy />+
                </h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="news-section" id="news" data-aos="fade-right">
          <h2 className="section-title">Tin Tức</h2>
          <hr className="section-divider" />
          <div className="news-grid">
            <div
              className="news-main"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="news-image-wrapper">
                <img
                  src="https://tvpharm.com.vn/image/catalog/2024/School%20tours%202024/H%E1%BB%93%20Ch%C3%AD%20Minh/465573022_568594952357666_8603410735615352863_n.jpg"
                  alt="Bé khỏe cùng Mây"
                  className="news-image"
                />
              </div>
              <div className="news-content">
                <h3 className="news-title">
                  Bé khỏe cùng Mây đồng hành cùng y tế học đường
                </h3>
                <p className="news-description">
                  Chuỗi chương trình hỗ trợ sức khỏe học sinh đang được triển
                  khai trên toàn quốc với sự tham gia của nhiều chuyên gia y tế.
                </p>
                <a href="#" className="news-link">
                  Xem chi tiết &rarr;
                </a>
              </div>
            </div>

            <div
              className="news-sub"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <div className="news-image-wrapper">
                <img
                  src="https://cloudcdnvod.tek4tv.vn/Mam/attach/upload/05062025175919/53078d3a-3950-4812-b9dc-7c4c250878eb-227.webp"
                  alt="Phòng chống Covid"
                  className="news-image"
                />
              </div>
              <div className="news-content">
                <h4 className="news-sub-title">
                  SchoMed xây dựng tiêu chí phòng Covid-19 trong trường học
                </h4>
                <p className="news-description">
                  Hà Nội nhấn mạnh kiểm soát dịch bệnh hiệu quả là một trong
                  những mục tiêu trọng tâm của y tế học đường năm học mới.
                </p>
                <a href="#" className="news-link">
                  Xem chi tiết &rarr;
                </a>
              </div>
            </div>

            <div
              className="news-sub"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <div className="news-image-wrapper">
                <img
                  src="https://i1-vnexpress.vnecdn.net/2021/10/04/gv-1633331613-8943-1633331713.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=d5OwM62Yb_BQerpcAgUp0w"
                  alt="Giáo viên thể dục"
                  className="news-image"
                />
              </div>
              <div className="news-content">
                <h4 className="news-sub-title">
                  Mục tiêu: 100% trường học có giáo viên thể dục
                </h4>
                <p className="news-description">
                  Tăng cường thể chất học sinh bằng cách đảm bảo đầy đủ giáo
                  viên thể dục trong toàn bộ hệ thống trường học.
                </p>
                <a href="#" className="news-link">
                  Xem chi tiết &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="why-section" data-aos="fade-up">
          <h2 className="section-title">Vì sao bạn chọn SchoMed</h2>
          <div className="why-grid">
            {[
              {
                icon: "fa-user-md",
                title: "Đội ngũ chuyên môn",
                desc: "Các bác sĩ, y tá giàu kinh nghiệm, tận tâm với học sinh.",
              },
              {
                icon: "fa-shield-alt",
                title: "An toàn & Bảo mật",
                desc: "Thông tin sức khỏe học sinh được bảo mật tuyệt đối.",
              },
              {
                icon: "fa-heartbeat",
                title: "Dịch vụ toàn diện",
                desc: "Chăm sóc sức khỏe học đường từ A-Z, hỗ trợ 24/7.",
              },
            ].map((item, i) => (
              <div
                className="why-item"
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="why-icon">
                  <i className={`fa ${item.icon}`}></i>
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-description">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="feedback-section" data-aos="fade-up">
          <h2 className="section-title">Phụ huynh đánh giá về SchoMed</h2>
          <div className="feedback-grid">
            <div
              className="feedback-card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="feedback-text">
                "Từ ngày có SchoMed, tôi yên tâm hơn khi con ở trường. Mọi thông
                tin sức khỏe đều được cập nhật rõ ràng."
              </p>
              <span className="feedback-author">– Chị Linh, Quận 3</span>
            </div>
            <div
              className="feedback-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="feedback-text">
                "Nhân viên y tế hỗ trợ tận tình, hệ thống quản lý hồ sơ sức khỏe
                tiện lợi và dễ dùng."
              </p>
              <span className="feedback-author">– Anh Hùng, Bình Thạnh</span>
            </div>
            <div
              className="feedback-card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <p className="feedback-text">
                "Mỗi lần con uống thuốc ở trường đều được thông báo. Tôi thấy
                rất chuyên nghiệp và an tâm."
              </p>
              <span className="feedback-author">– Cô Mai, Thủ Đức</span>
            </div>
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

export default HomePage;
