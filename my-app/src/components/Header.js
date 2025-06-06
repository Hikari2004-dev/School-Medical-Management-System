import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src="/logo192.png" alt="SchoMed Logo" />
          <span className="brand">SchoMed</span>
        </div>
        <div className="header-actions">
          <input type="text" placeholder="Tìm kiếm..." className="search-input" />
          <button className="login-btn">Đăng nhập</button>
          <button className="signup-btn">Đăng ký</button>
        </div>
      </div>
      <nav className="header-nav">
        <ul>
          <li>Trang chủ</li>
          <li>Tin tức</li>
          <li>Sự kiện</li>
          <li>Giới thiệu</li>
          <li>Liên hệ</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;