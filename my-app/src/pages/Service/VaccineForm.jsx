// src/pages/Service/VaccineForm.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './VaccineForm.css';

const vaccineCards = [
  {
    title: "Vaccine Phòng Cúm",
    subtitle: "Bảo vệ khỏi chủng virus cúm mùa phổ biến",
    details: ["Hiệu lực: 6–12 tháng", "Độ tuổi: 6–60 tháng", "Tác dụng phụ: Nhẹ"],
    price: "250.000 VND"
  },
  {
    title: "Vaccine Covid-19",
    subtitle: "WHO & Bộ Y tế khuyến cáo",
    details: ["Pfizer, Moderna, AstraZeneca", "Hiệu lực: 90–95%", "Độ tuổi: Từ 12 tuổi", "Tác dụng phụ: Sốt"],
    price: "Miễn phí"
  },
  {
    title: "Vaccine Viêm Gan B",
    subtitle: "Bảo vệ gan khỏi tổn thương",
    details: ["Liều: 3 mũi", "Hiệu lực: 95%", "Độ tuổi: Mọi lứa tuổi"],
    price: "180.000 VND"
  },
  {
    title: "Vaccine Thủy Đậu",
    subtitle: "Phòng ngừa thủy đậu an toàn",
    details: ["Liều: 1–2 mũi", "Độ tuổi: Trên 12 tháng", "Hiệu lực: 85–90%"],
    price: "850.000 VND"
  },
];

export default function VaccineForm() {
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  return (
    <>
      <Header />

      <div className="vaccine-page">
        {/* Breadcrumb */}
        <nav className="vaccine-breadcrumb">
          <Link to="/" className="breadcrumb-link">Trang chủ</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/services" className="breadcrumb-link">Dịch vụ</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Đăng kí Vaccine</span>
        </nav>

        <h1 className="vaccine-main-title">Đặt Lịch Tiêm Vaccine</h1>
        <p className="vaccine-subtitle">Chỉ cần vài bước đơn giản, chúng tôi sẽ nhắc bạn đúng lịch.</p>

        <div className="vaccine-content">
          {/* Form */}
          <div className="vaccine-form-wrapper">
            <form className="vaccine-form">
              <div className="vaccine-grid">
                <div className="vaccine-field">
                  <label>Họ và Tên <span className="required">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" />
                </div>
                <div className="vaccine-field">
                  <label>Số điện thoại <span className="required">*</span></label>
                  <input type="tel" placeholder="+84 912 345 678" />
                </div>
                <div className="vaccine-field">
                  <label>Email</label>
                  <input type="email" placeholder="email@example.com" />
                </div>
                <div className="vaccine-field">
                  <label>Tuổi <span className="required">*</span></label>
                  <input type="number" placeholder="30" min="0" />
                </div>
                <div className="vaccine-field">
                  <label>Loại vaccine <span className="required">*</span></label>
                  <select defaultValue="">
                    <option value="" disabled>Chọn loại vaccine</option>
                    <option>Phòng Cúm</option>
                    <option>Covid-19</option>
                    <option>Viêm Gan B</option>
                    <option>Thủy Đậu</option>
                  </select>
                </div>
                <div className="vaccine-field">
                  <label>Ngày hẹn <span className="required">*</span></label>
                  <input type="date" min={minDate} />
                </div>
                <div className="vaccine-field">
                  <label>Giờ hẹn <span className="required">*</span></label>
                  <input type="time" />
                </div>
                <div className="vaccine-field">
                  <label>Địa điểm</label>
                  <select defaultValue="">
                    <option value="" disabled>Chọn địa điểm</option>
                    <option>Bệnh viện A</option>
                    <option>Phòng khám B</option>
                    <option>Trung tâm Y tế C</option>
                  </select>
                </div>
              </div>

              <div className="vaccine-field full-width">
                <label>Ghi chú</label>
                <textarea rows={3} placeholder="Ghi chú đặc biệt (nếu có)..." />
              </div>

              <button type="submit" className="vaccine-submit">
                Đăng Ký Tiêm Vaccine
              </button>
            </form>
          </div>

          {/* Vaccine Packages */}
          <div className="vaccine-cards-wrapper">
            {vaccineCards.map((v, i) => (
              <div key={i} className="vaccine-card-small">
                <h3 className="card-title">{v.title}</h3>
                <p className="card-subtitle">{v.subtitle}</p>
                <ul className="card-details">
                  {v.details.map((d,j) => <li key={j}>{d}</li>)}
                </ul>
                <div className="card-price">{v.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
