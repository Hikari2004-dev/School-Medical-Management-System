import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { CheckCircle, PhoneCall } from "lucide-react";
import HealthCheckImage from "../../image/hinhanh/HealtheCheck2.png";
import "./HealthCheck.css";

const packages = [
  {
    title: "Gói Khám Cơ Bản",
    features: [
      "Khám tổng thể (thể lực, chiều cao, cân nặng)",
      "Kiểm tra huyết áp",
      "Đo thị lực cơ bản",
      "Tư vấn dinh dưỡng",
    ],
    price: "150.000₫/lần",
  },
  {
    title: "Gói Phổ Thông",
    features: [
      "Tất cả nội dung Gói Khám Cơ Bản",
      "Khám tai – mũi – họng",
      "Kiểm tra răng miệng",
      "Xét nghiệm máu tổng quát",
    ],
    price: "250.000₫/lần",
  },
  {
    title: "Gói Nâng Cao",
    features: [
      "Tất cả nội dung Gói Phổ Thông",
      "Siêu âm tim – phổi",
      "Đo loãng xương cơ bản",
      "Tư vấn sức khỏe tâm thần",
    ],
    price: "350.000₫/lần",
  },
  {
    title: "Gói Toàn Diện",
    features: [
      "Tất cả nội dung Gói Nâng Cao",
      "Kiểm tra cột sống",
      "Xét nghiệm nước tiểu",
      "Khám mắt chuyên sâu",
      "Báo cáo & tư vấn chi tiết",
    ],
    price: "500.000₫/lần",
  },
];

const HealthCheck = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: xử lý submit
  };

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

      {/* Banner (cập nhật) */}
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

      {/* Main: Form & Packages */}
      <section className="hc-main">
        {/* Form panel */}
        <div className="hc-form-wrapper">
          <h3 className="hc-form-title">Đăng ký gói khám</h3>
          <form className="hc-form" onSubmit={handleSubmit}>
            <div className="hc-form-group">
              <label>Họ và tên <span>*</span></label>
              <input
                type="text"
                placeholder="Nhập họ và tên học sinh"
                required
              />
            </div>
            <div className="hc-form-group">
              <label>Ngày sinh <span>*</span></label>
              <input type="date" required />
            </div>
            <div className="hc-form-group">
              <label>Số điện thoại <span>*</span></label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div className="hc-form-group">
              <label>Gói khám <span>*</span></label>
              <select required>
                <option value="">Chọn gói khám</option>
                {packages.map((pkg) => (
                  <option key={pkg.title} value={pkg.title}>
                    {pkg.title} – {pkg.price}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="hc-submit-button">
              Đăng ký ngay
            </button>
          </form>
        </div>

        {/* Packages panel */}
        <div className="hc-packages-wrapper">
          <h3 className="hc-packages-title">Các gói khám tham khảo</h3>
          <div className="hc-packages-list">
            {packages.map((pkg) => (
              <div key={pkg.title} className="hc-package-card">
                <div className="hc-package-header">
                  <span className="hc-package-name">{pkg.title}</span>
                  <span className="hc-package-price">{pkg.price}</span>
                </div>
                <ul className="hc-package-features">
                  {pkg.features.map((f, idx) => (
                    <li key={idx}>
                      <CheckCircle className="hc-package-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HealthCheck;
