// src/Header.jsx
import React from "react";
import BannerImg from "../Image/banner.png";
import logo from "../Image/SchoMed.png";  

export default function Header() {
  return (
    <header className="w-full">
      {/* 1. Top Info Bar */}
      <div className="bg-blue-600 text-white flex items-center justify-between px-6 h-10 text-sm">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1">
            <i className="fas fa-map-marker-alt"></i>
            <span>Địa chỉ</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-phone"></i>
            <span>Phone number</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-envelope"></i>
            <span>Gmail</span>
          </span>
        </div>
        <div className="flex items-center space-x-4 text-base">
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href="#" className="hover:text-gray-200">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="bg-white flex items-center justify-between px-6 py-4 shadow">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <a href="/">
            <img
              src={logo}
              alt="Schomed Logo"
              className="w-16 h-16 object-contain"
            />
          </a>
          <div>
            <h1 className="text-2xl font-serif text-blue-600">Schomed</h1>
            <p className="text-sm text-gray-600">School Medical</p>
          </div>
        </div>
        {/* Search */}
        <div className="relative flex-1 max-w-md mx-6">
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ, tin tức..."
            className="w-full h-10 border border-gray-300 rounded-full pl-4 pr-10 text-sm"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
            <i className="fas fa-search"></i>
          </span>
        </div>
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-bell text-xl text-gray-600"></i>
          <i className="fas fa-paper-plane text-xl text-gray-600"></i>
          <button className="flex items-center space-x-2 bg-gray-200 px-4 py-1 rounded-full text-sm">
            <i className="fas fa-user"></i>
            <span>Log in / Sign up</span>
          </button>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <nav className="bg-blue-600 text-white">
        <div className="flex items-center justify-center space-x-8 h-12">
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-200"
          >
            <i className="fas fa-home"></i>
            <span>Trang chủ</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-200"
          >
            <i className="fas fa-user-friends"></i>
            <span>Hội viên</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-200"
          >
            <i className="fas fa-newspaper"></i>
            <span>Tin Tức</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-200"
          >
            <i className="fas fa-stethoscope"></i>
            <span>Dịch vụ</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 hover:text-gray-200"
          >
            <i className="fas fa-archive"></i>
            <span>Tra cứu bệnh nhân</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
