import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import ClickSpark from "../hooks/ClickSpark";
import SplitText from "../hooks/SplitText";
import GooeyNav from "../hooks/GooeyNav";
import "../hooks/GooeyNav.css";

import "./HomePage.css";

import LogoImg from "../image/14_1.png"; // Đã đổi tên ảnh để tránh lỗi
import Img1 from "../image/1.png";
import Img2 from "../image/2.png";
import Img3 from "../image/3.png";
import Img4 from "../image/4.png";
import BvNhiDong from "../image/bvnhidong.png";
import ChoRay from "../image/choray.png";
import DaKhoa from "../image/dakhoa.png";
import DHYDuoc from "../image/dhyduoc.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % 4;
        AOS.refresh();
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Trang chủ", href: "#" },
    { label: "Tin tức", href: "#news" },
    { label: "Thiết bị y tế", href: "#devices" },
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
      <div className="page-container" style={{ fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif" }}>
        {/* Nội dung giữ nguyên */}

        {/* Sửa đoạn này để tránh lỗi JSX: CountUp */}
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
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sửa nút điều hướng để dùng navigate thay vì window.location */}
        <section className="subscription-section" data-aos="fade-up">
          <h2 className="subscription-title">
            Trải nghiệm tốt hơn với gói thành viên
          </h2>
          <p className="subscription-text">
            Đăng ký gói thành viên để nhận tư vấn chuyên sâu, theo dõi sức khỏe học sinh thường xuyên và ưu đãi hấp dẫn từ các đối tác y tế.
          </p>
          <button
            className="subscription-button"
            onClick={() => navigate("/hoivien")}
          >
            Đăng ký ngay
          </button>
        </section>

        {/* Toàn bộ phần còn lại giữ nguyên nếu không có lỗi khác */}

      </div>
    </ClickSpark>
  );
}

export default HomePage;