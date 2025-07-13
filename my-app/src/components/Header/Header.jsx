import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import BannerImg from "../../image/hinhanh/backgroundyte.png";
import logo from "../../image/hinhanh/logoproject.png";
import "./Header.css";


export default function Header() {
  const location = useLocation();
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");
  const [showDropdown, setShowDropdown] = useState(false);
  const hideTimeout = useRef();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleDropdownEnter = () => {
    clearTimeout(hideTimeout.current);
    setShowDropdown(true);
  };

  const handleDropdownLeave = () => {
    hideTimeout.current = setTimeout(() => setShowDropdown(false), 500); // 500ms delay
  };

  return (
    <header className="homepage-header">
      {/* 1. Top Info Bar */}
      <div className="info-bar">
        <div className="info-content">
          <span className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Địa chỉ</span>
          </span>
          <span className="info-item">
            <i className="fas fa-phone"></i>
            <span>Phone number</span>
          </span>
          <span className="info-item">
            <i className="fas fa-envelope"></i>
            <span>Gmail</span>
          </span>
        </div>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="main-header">
        {/* Logo */}
        <div className="logo-section">
          <Link to="/">
            <img
              src={logo}
              alt="Schomed Logo"
              className="logo-img"
            />
          </Link>
          <div>
            <h1 className="logo-title">Schomed</h1>
            <p className="logo-subtitle">School Medical</p>
          </div>
        </div>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ, tin tức..."
            className="search-input"
          />
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>

        {/* Actions */}
        <div className="header-actions">
          <Link to="/notification" className="notification-link">
            <i className="fas fa-bell action-icon"></i>
            <span className="notification-dot"></span>
          </Link>
          <i className="fas fa-paper-plane action-icon"></i>

          {(userName && token) ? (
            <div
              className="user-dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <span className="login-btn user-btn">
                <i className="fas fa-user"></i>
                Xin chào, {userName}
              </span>
              <div className="logout-dropdown" style={{ display: showDropdown ? "block" : "none" }}>
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <i className="fas fa-user"></i>
              <span>Log in </span> <span>/ Sign up</span>
            </Link>
          )}
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <i className="fas fa-home"></i>
            <span>Trang chủ</span>
          </Link>
          <Link
            to="/member"
            className={`nav-link ${location.pathname === '/member' ? 'active' : ''}`}
          >
            <i className="fas fa-user-friends"></i>
            <span>Hội viên</span>
          </Link>
          <Link
            to="/news"
            className={`nav-link ${location.pathname === '/news' ? 'active' : ''}`}
          >
            <i className="fas fa-newspaper"></i>
            <span>Tin Tức</span>
          </Link>
          <Link
            to="/services"
            className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
          >
            <i className="fas fa-stethoscope"></i>
            <span>Dịch vụ</span>
          </Link>
          <Link
            to="/student-profile"
            className={`nav-link ${location.pathname === '/student-profile' ? 'active' : ''}`}
          >
            <i className="fas fa-archive"></i>
            <span>Tra cứu học sinh</span>
          </Link>
        </div>
      </nav>

      {/* 4. Banner Image dưới Navbar */}
      <div className="banner-container">
        <img
          src={BannerImg}
          alt="Banner"
          className="banner-img"
        />
      </div>
    </header>
  );
}
