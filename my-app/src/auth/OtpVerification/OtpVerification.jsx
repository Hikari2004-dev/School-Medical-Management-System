import React, { useRef } from 'react';
import './OtpVerification.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import LogoImg from '../../image/hinhanh/logoproject.png';
import Background from '../../image/hinhanh/backgroundauth.png';

function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Thêm dòng này
  const email = location.state?.email || "example@gmail.com";

  // Hàm che email (chỉ giữ 2 ký tự cuối phần user)
  const maskEmail = (email) => {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    const visibleChars = 2;
    const maskedUser = '*'.repeat(user.length - visibleChars) + user.slice(-visibleChars);
    return `${maskedUser}@${domain}`;
  };

  const otpRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) {
      e.target.value = '';
      return;
    }

    if (value.length === 1 && index < 5) {
      const nextInput = otpRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    } else if (value === '' && index > 0) {
      const prevInput = otpRefs.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpRefs.current.map(ref => ref?.value || '').join('');

    if (otp.length === 6) {
      console.log("OTP nhập:", otp);
      navigate("/otp-success"); // ✅ Chuyển hướng khi OTP đúng
    } else {
      alert("Vui lòng nhập đủ 6 số OTP");
    }
  };

  return (
    <div className="otp-wrapper" style={{ backgroundImage: `url(${Background})` }}>
      <div className="otp-container">
        <img src={LogoImg} alt="Logo" className="logo-image" />
        <h2 className="title">Xác thực OTP</h2>
        <p className="subtitle">
          Mã xác thực gồm 6 chữ số đã được gửi đến<br />
          <strong>{maskEmail(email)}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                ref={(el) => otpRefs.current[index] = el}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </div>

          <div className="resend-link">
            <Link to="/otp-verification" state={{ email }}>
              Gửi lại OTP
            </Link>
          </div>

          <button type="submit" className="btn-submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
