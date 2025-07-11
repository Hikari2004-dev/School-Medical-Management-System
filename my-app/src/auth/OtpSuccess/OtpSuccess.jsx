// src/auth/OtpSuccess/OtpSuccess.jsx
import React from 'react';
import './OtpSuccess.css';
import { Link } from 'react-router-dom';

import LogoImg from '../../image/hinhanh/logoproject.png';
import SuccessIcon from '../../image/icon/tick.png';
import Background from '../../image/hinhanh/backgroundauth.png';

function OtpSuccess() {
  return (
    <div
      className="otp-success-wrapper"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="otp-success-container">
        <img src={LogoImg} alt="Logo" className="logo-image" />
        <img src={SuccessIcon} alt="Success" className="success-icon" />

        <h2 className="title">Xác thực thành công!</h2>
        <p className="subtitle">
          Bạn đã xác thực mã OTP thành công. Bây giờ bạn có thể đặt lại mật khẩu.
        </p>

        <Link to="/reset-password" className="btn-continue">
          Đặt lại mật khẩu
        </Link>
      </div>
    </div>
  );
}

export default OtpSuccess;

