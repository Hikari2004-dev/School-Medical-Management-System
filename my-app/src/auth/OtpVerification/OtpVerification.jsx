// src/auth/OtpVerification/OtpVerification.jsx
import React, { useState, useRef, useEffect } from 'react';
import './OtpVerification.css';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoImg from '../../image/hinhanh/logoproject.png';
import Background from '../../image/hinhanh/backgroundauth.png';

// Module-level flag to ensure the initial send happens exactly once
let initialOtpSent = false;

function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [sending, setSending] = useState(false);
  const otpRefs = useRef([]);

  // Che email, giữ 2 ký tự cuối phần user
  const maskEmail = (e) => {
    const [u, d] = e.split('@');
    if (!u || !d) return e;
    const keep = 2;
    const stars = '*'.repeat(Math.max(0, u.length - keep));
    return stars + u.slice(-keep) + '@' + d;
  };

  // Gửi OTP (dùng cho cả initial và manual)
  const sendOtp = async () => {
    if (!email) {
      alert('Email không hợp lệ');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/otp/generate?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accountNumber: email }),
        }
      );
      const text = await res.text();
      if (!res.ok) throw new Error(text || 'Lỗi gửi OTP');
      alert('OTP đã gửi tới email của bạn');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSending(false);
    }
  };

  // Chỉ tự động gửi 1 lần dù StrictMode mount/unmount
  useEffect(() => {
    if (!initialOtpSent) {
      sendOtp();
      initialOtpSent = true;
    }
  }, []);

  // Handle focus next/prev
  const handleChange = (e, idx) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = v;
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!v && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  // Khi nhấn Continue
  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpRefs.current.map(i => i.value).join('');
    if (otp.length !== 6) {
      alert('Vui lòng nhập đủ 6 chữ số OTP');
      return;
    }
    navigate('/reset-password', { state: { email, otp } });
  };

  return (
    <div className="otp-wrapper" style={{ backgroundImage: `url(${Background})` }}>
      <div className="otp-container">
        <img src={LogoImg} alt="Logo" className="logo-image" />
        <h2 className="title">Xác thực OTP</h2>
        <p className="subtitle">
          Mã 6 chữ số đã được gửi đến <strong>{maskEmail(email)}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className="otp-input"
                ref={el => otpRefs.current[i] = el}
                onChange={e => handleChange(e, i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="resend-btn"
            onClick={sendOtp}
            disabled={sending}
          >
            {sending ? 'Đang gửi...' : 'Gửi lại OTP'}
          </button>

          <button type="submit" className="btn-submit">
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
