import React from "react";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { CheckCircle, PhoneCall } from "lucide-react";
import HealthCheckImage from "../../Image/HealthCheck2.png";
import './HealthCheck.css';

const packages = [
  {
    title: "Gói Khám Cơ Bản",
    features: [
      "Khám tổng thể (thể lực, chiều cao, cân nặng)",
      "Kiểm tra huyết áp",
      "Đo thị lực cơ bản",
      "Tư vấn dinh dưỡng",
    ],
    price: "150.000₫/lần khám",
  },
  {
    title: "Gói Phổ Thông",
    features: [
      "Tất cả nội dung Gói Khám Cơ Bản",
      "Khám tai – mũi – họng",
      "Kiểm tra răng miệng",
      "Xét nghiệm máu tổng quát",
    ],
    price: "250.000₫/lần khám",
  },
  {
    title: "Gói Nâng Cao",
    features: [
      "Tất cả nội dung Gói Phổ Thông",
      "Siêu âm tim – phổi",
      "Đo loãng xương cơ bản",
      "Tư vấn sức khỏe tâm thần (trắc nghiệm ngắn)",
    ],
    price: "350.000₫/lần khám",
  },
  {
    title: "Gói Toàn Diện Học Đường",
    features: [
      "Tất cả nội dung Gói Nâng Cao",
      "Kiểm tra cột sống (phát hiện tư thế sai)",
      "Xét nghiệm nước tiểu",
      "Khám mắt chuyên sâu (đo khúc xạ)",
      "Báo cáo và tư vấn kết quả chi tiết",
    ],
    price: "500.000₫/lần khám",
  },
];

const HealthCheck = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit form logic
  };

  return (
    <div className="healthcheck-page">
      <Header />

      <nav className="breadcrumb">
        Trang chủ &gt; Dịch vụ &gt; <span>Khám sức khỏe định kì</span>
      </nav>

      <section className="intro-section">
        <div className="intro-content">
          <ul className="features-list">
            {[
              "Khám tổng quát 18 hạng mục (chiều cao, cân nặng, huyết áp, tim mạch…)",
              "Kiểm tra thị lực & thính lực sớm phát hiện cận – viễn thị, mất thính lực",
              "Khám tai – mũi – họng & răng hàm mặt phòng ngừa viêm VA, sâu răng học đường",
              "Đánh giá tâm thần & hành vi giúp phát hiện stress, tăng động, hỗ trợ bé tự tin",
              "Tư vấn dinh dưỡng – vận động cá nhân hóa theo lứa tuổi, lưu hồ sơ điện tử",
            ].map((text, idx) => (
              <li key={idx} className="feature-item">
                <CheckCircle className="feature-icon" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="contact-section">
            Liên hệ <strong>chuyên gia</strong> để tư vấn
            <div className="contact-phone">
              <PhoneCall className="phone-icon" /> 19002115
            </div>
            hoặc
            <button
              className="chat-button"
              onClick={() => window.dispatchEvent(new Event('open-chat'))}
            >
              Chat ngay
            </button>
          </div>
        </div>
        <div className="intro-image">
          <img src={HealthCheckImage} alt="Khám sức khỏe" />
        </div>
      </section>

      <section className="booking-section">
        <div className="form-section">
          <h2>Đăng ký gói khám</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label>Họ và tên <span>*</span></label>
              <input type="text" placeholder="Nhập họ và tên học sinh" required />
            </div>
            <div className="form-group">
              <label>Ngày sinh <span>*</span></label>
              <input type="date" required />
            </div>
            <div className="form-group">
              <label>Số điện thoại <span>*</span></label>
              <input type="tel" placeholder="Nhập số điện thoại" required />
            </div>
            <div className="form-group">
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
            <button type="submit" className="submit-button">
              Đăng ký ngay
            </button>
          </form>
        </div>

        <div className="packages-section">
          <h3>Các gói khám tham khảo</h3>
          <div className="packages-list">
            {packages.map((pkg) => (
              <div key={pkg.title} className="package-card">
                <div className="package-header">
                  <span className="package-name">{pkg.title}</span>
                  <span className="package-price">{pkg.price}</span>
                </div>
                <ul className="package-features">
                  {pkg.features.map((f, i) => (<li key={i}>{f}</li>))}
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