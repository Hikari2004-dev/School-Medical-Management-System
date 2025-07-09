// src/Member/MemberPage.jsx
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import MemberIllustration from '../../image/hinhanh/backgroundyte2.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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
            'thông báo phụ huynh',
            'Quản lý đơn thuốc do phụ huynh gửi',
            'Cập nhật sức khỏe học sinh ở trường',
            'Ghi lại tình trạng học sinh khi sử dụng thuốc',
            { text: 'Quản lý giới hạn tài khoản', warning: true },
        ],
    },
    {
        title: 'Mức Cao',
        subtitle: 'Cao cấp',
        price: '1.500.000.000',
        period: 'VND/Năm',
        type: 'premium',
        features: [
            'Bao gồm các mức ở thường',
            'Cung cấp tư vấn viên 24/7',
            'Gửi thông báo phụ huynh về tình sức khỏe của con',
            'Cung cấp các mức thông báo tình hình phụ bằng hình ảnh',
            'Cung cấp các buổi training miễn phí',
            'Quản lý không giới hạn tài khoản',
        ],
    },
];

export default function MemberPage() {
    return (
        <div>
            {/* Header Component */}
            <Header />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    {/* Left: Breadcrumb + Title + Subtitle */}
                    <div className="hero-content">
                        <span className="breadcrumb">
                            Trang Chủ &gt;&gt; Hội Viên
                        </span>
                        <h1 className="hero-title">
                            Gói đăng ký quản<br className="md:hidden" /> lý sức khỏe học sinh
                        </h1>
                        <p className="hero-subtitle">
                            Chọn gói phù hợp với trường học của bạn
                        </p>
                    </div>

                    {/* Right: Illustration */}
                    <div className="hero-image-container">
                        <img
                            src={MemberIllustration}
                            alt="Illustration"
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>

            {/* Package Section */}
            <section className="package-section">
                {plans.map((plan, idx) => (
                    <div key={idx} className="package-card">
                        {/* Header */}
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

                        {/* Features */}
                        <ul className="package-features">
                            {plan.features.map((feat, i) => {
                                const isWarning = typeof feat === 'object' && feat.warning;
                                const text = typeof feat === 'object' ? feat.text : feat;
                                return (
                                    <li key={i} className="feature-item">
                                        {isWarning ? (
                                            <AlertCircle className="feature-icon feature-icon-warning" />
                                        ) : (
                                            <CheckCircle className="feature-icon feature-icon-success" />
                                        )}
                                        <span className="feature-text">{text}</span>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Button */}
                        <div className="package-button-container">
                            <button className={`package-button package-button-${plan.type}`}>
                                Mua ngay
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}
