import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { CheckCircle, PhoneCall, AlertTriangle } from "lucide-react";
import HealthCheckImage from "../../image/hinhanh/HealtheCheck2.png";
import "./HealthCheck.css";

const HealthCheck = () => {
  return (
    <div className="healthcheck-page">
      <Header />

      {/* Breadcrumb */}
      <div className="hc-breadcrumb">
        <nav className="hc-breadcrumb-nav">
          <Link to="/" className="hc-breadcrumb-link">Trang chủ</Link>
          <span>&gt;</span>
          <Link to="/services" className="hc-breadcrumb-link">Dịch vụ</Link>
          <span>&gt;</span>
          <span className="hc-breadcrumb-current">Khám sức khỏe định kì</span>
        </nav>
      </div>

      {/* Banner */}
      <section className="hc-banner">
        <div className="hc-banner-card">
          <div className="hc-banner-content">
            <h2 className="hc-banner-title">Khám sức khỏe định kì</h2>

            <ul className="hc-features">
              {[
                "Đội ngũ y tá giàu kinh nghiệm & tận tâm",
                "Trang thiết bị hiện đại, chuẩn quốc tế",
                "Quy trình nhanh chóng, chuyên nghiệp",
                "Báo cáo chi tiết, dễ hiểu cho phụ huynh",
                "Bảo mật thông tin tuyệt đối",
              ].map((txt, i) => (
                <li key={i} className="hc-feature-item">
                  <CheckCircle className="hc-feature-icon" />
                  <span>{txt}</span>
                </li>
              ))}
            </ul>

            <div className="hc-contact">
              <span>Liên hệ ngay qua <strong>số điện thoại</strong></span>
              <PhoneCall className="hc-phone-icon" />
              <a href="tel:19002115" className="hc-hotline">19002115</a>
              <span>hoặc</span>
              <button
                className="hc-chat-button"
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
              >
                Chat ngay
              </button>
            </div>
          </div>
          <div className="hc-banner-image">
            <img src={HealthCheckImage} alt="Khám sức khỏe định kì" />
          </div>
        </div>
      </section>

      {/* Main: Thông báo đang phát triển */}
      <section className="hc-main">
        <div className="hc-form-wrapper">
          <div className="hc-developing-box">
            <AlertTriangle className="hc-developing-icon" />
            <h3 className="hc-developing-title">Tính năng đang phát triển</h3>
            <p className="hc-developing-desc">
              Chức năng đăng ký khám sức khỏe hiện đang được xây dựng để phục vụ bạn tốt hơn trong thời gian tới.
              <br />
              Chúng tôi sẽ cập nhật sớm nhất có thể!
            </p>
            <button className="hc-back-button" onClick={() => window.location.href = "/"}>
              ⬅ Quay về trang chủ
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HealthCheck;
