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
  const [toast, setToast] = useState({ text: "", type: "" });
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
      setToast({ text: 'Email không hợp lệ', type: 'error' });
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
      setToast({ text: 'OTP đã gửi tới email của bạn', type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ text: err.message, type: 'error' });
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

  // Tự động ẩn toast sau 6s
  useEffect(() => {
    if (toast.text) {
      const timer = setTimeout(() => setToast({ text: "", type: "" }), 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle focus next/prev
  const handleChange = (e, idx) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = v;
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!v && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  // Khi nhấn Continue
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpRefs.current.map(i => i.value).join('');
    if (otp.length !== 6) {
      setToast({ text: 'Vui lòng nhập đủ 6 chữ số OTP', type: 'error' });
      return;
    }
    try {
      const url = new URL('http://localhost:8080/api/otp/change-password');
      url.searchParams.set('email', email);
      url.searchParams.set('otp', otp);
      url.searchParams.set('newPassword', 'dummy'); // chỉ kiểm tra OTP

      const res = await fetch(url.toString(), { method: 'POST' });
      const text = await res.text();
      if (!res.ok || text.includes('Invalid OTP')) {
        throw new Error('OTP không đúng hoặc đã hết hạn!');
      }
      // Nếu thành công, chuyển sang trang OtpSuccess
      navigate('/otp-success', { state: { email, otp } });
    } catch (err) {
      setToast({ text: err.message, type: 'error' });
    }
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

      {/* Toast thông báo góc phải */}
      {toast.text && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            minWidth: 240,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
          className={`p-4 rounded transition-all ${
            toast.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span>{toast.text}</span>
          <button
            onClick={() => setToast({ text: "", type: "" })}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 18,
              fontWeight: "bold",
              cursor: "pointer",
              marginLeft: 8,
              color: "inherit",
            }}
            aria-label="Đóng thông báo"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default OtpVerification;
