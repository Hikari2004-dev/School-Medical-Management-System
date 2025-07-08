// src/HomePage/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">SchoMed</h3>
          <p className="text-sm">
            SchoMed – Giải pháp quản lý sức khỏe học sinh toàn diện.  
            Chúng tôi đồng hành cùng nhà trường và phụ huynh để  
            đảm bảo sự phát triển khỏe mạnh cho thế hệ tương lai.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Liên kết nhanh</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Trang chủ</a></li>
            <li><a href="#" className="hover:underline">Hội viên</a></li>
            <li><a href="#" className="hover:underline">Tin Tức</a></li>
            <li><a href="#" className="hover:underline">Dịch vụ</a></li>
            <li><a href="#" className="hover:underline">Tra cứu bệnh nhân</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Liên hệ</h4>
          <p className="text-sm mb-4">
            📍 123 Đường Y, Quận Z, TP. HCM<br/>
            📞 (028) 1234 5678<br/>
            ✉️ info@schomed.edu.vn
          </p>
          <div className="flex space-x-4 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-gray-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gray-300">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-blue-500 pt-4 text-center text-sm">
        © {new Date().getFullYear()} SchoMed. All rights reserved.
      </div>
    </footer>
  );
}
