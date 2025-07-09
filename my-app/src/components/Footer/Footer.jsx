// src/HomePage/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="homepage-footer">
      <div className="footer-content">
        {/* About */}
        <div>
          <h3 className="footer-section-title">SchoMed</h3>
          <p className="footer-description">
            SchoMed – Giải pháp quản lý sức khỏe học sinh toàn diện.
            Chúng tôi đồng hành cùng nhà trường và phụ huynh để
            đảm bảo sự phát triển khỏe mạnh cho thế hệ tương lai.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-section-subtitle">Liên kết nhanh</h4>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Trang chủ</Link></li>
            <li><Link to="/member" className="footer-link">Hội viên</Link></li>
            <li><Link to="/news" className="footer-link">Tin Tức</Link></li>
            <li><Link to="/services" className="footer-link">Dịch vụ</Link></li>
            <li><Link to="/patient-search" className="footer-link">Tra cứu bệnh nhân</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="footer-section-subtitle">Liên hệ</h4>
          <div className="footer-contact">
            📍 123 Đường Y, Quận Z, TP. HCM<br />
            📞 (028) 1234 5678<br />
            ✉️ info@schomed.edu.vn
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social-link">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} SchoMed. All rights reserved.
      </div>
    </footer>
  );
}
