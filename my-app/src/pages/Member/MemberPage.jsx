// src/Member/MemberPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import MemberIllustration from '../../image/hinhanh/hoivien.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import VNPAYPaymentButton from './VNPAYPaymentButton'; // Thêm dòng này
import './MemberPage.css';

const plans = [
  {
    title: 'Cơ Bản',
    subtitle: 'Phổ thông',
    price: '550.000.000',
    period: 'VND/kỳ',
    type: 'basic',
    features: [
      'Sao lưu hồ sơ sức khỏe và vaccine',
      'Thông báo phụ huynh tự động',
      'Quản lý đơn thuốc do phụ huynh gửi',
      'Cập nhật tình trạng sức khỏe học sinh',
      'Ghi nhật ký tương tác khi dùng thuốc',
      { text: 'Giới hạn tài khoản theo gói', warning: true },
    ],
  },
  {
    title: 'Mức Cao',
    subtitle: 'Cao cấp',
    price: '1.500.000.000',
    period: 'VND/năm',
    type: 'premium',
    features: [
      'Bao gồm toàn bộ tính năng Gói Phổ Thông',
      'Tư vấn y tế 24/7',
      'Báo cáo định kỳ cho phụ huynh',
      'Báo cáo hình ảnh trực quan',
      'Buổi training trực tuyến miễn phí',
      'Tài khoản không giới hạn',
    ],
  },
];

export default function MemberPage() {
  const navigate = useNavigate();

  return (
    <div className="member-page">
      <Header />

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="breadcrumb">
              <Link to="/" className="breadcrumb-link">Trang Chủ</Link> &gt; Hội Viên
            </span>
            <h1 className="hero-title">
              Gói đăng ký quản lý<br />sức khỏe học sinh
            </h1>
            <p className="hero-subtitle">
              Chọn gói phù hợp nhất với nhu cầu của trường bạn
            </p>
          </div>
          <div className="hero-image-container">
            <img src={MemberIllustration} alt="Illustration" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="package-section">
        {plans.map((plan) => (
          <div key={plan.type} className="package-card">
            <div className={`package-header package-header-${plan.type}`}>
              <div className="package-header-content">
                <div>
                  <h2 className="package-title">{plan.title}</h2>
                  <span className="package-subtitle">{plan.subtitle}</span>
                </div>
                <div className="package-price-container">
                  <div className="package-price">{plan.price}</div>
                  <div className="package-period">{plan.period}</div>
                </div>
              </div>
            </div>

            <ul className="package-features">
              {plan.features.map((feat, i) => {
                const isWarning = typeof feat === 'object' && feat.warning;
                const text = typeof feat === 'object' ? feat.text : feat;
                return (
                  <li key={i} className="feature-item">
                    {isWarning
                      ? <AlertCircle className="feature-icon feature-icon-warning" />
                      : <CheckCircle className="feature-icon feature-icon-success" />
                    }
                    <span className="feature-text">{text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="package-button-container">
              <VNPAYPaymentButton
                amount={plan.type === 'basic' ? 550000000 : 1500000000}
                orderInfo={
                  `Đăng ký gói ${plan.title} - ${plan.subtitle}`
                }
                onSuccess={() => {
                  // Handle successful payment here
                  navigate('/success');
                }}
                onError={() => {
                  // Handle payment error here
                  navigate('/error');
                }}
                className={`package-button package-button-${plan.type}`}
              />
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
