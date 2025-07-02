import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <div className="banner">
      <img
        className="banner-image"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="Banner"
      />
      <div className="banner-overlay">
        <h2>Chào mừng đến với SchoMed</h2>
        <p>Giải pháp quản lý y tế trường học toàn diện</p>
      </div>
    </div>
  );
}

export default Banner;