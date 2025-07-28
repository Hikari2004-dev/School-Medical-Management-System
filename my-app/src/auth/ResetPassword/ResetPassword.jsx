import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { useNavigate, useLocation } from 'react-router-dom';

import LogoImg from '../../image/hinhanh/logoproject.png';
import Background from '../../image/hinhanh/backgroundauth.png';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email    = location.state?.email || '';
  const otp      = location.state?.otp   || '';

  // ★ Định nghĩa maskEmail ngay đây
  const maskEmail = (e) => {
    const [user, domain] = e.split('@');
    if (!user || !domain) return e;
    const keep = 2; // giữ 2 ký tự cuối
    const stars = '*'.repeat(Math.max(0, user.length - keep));
    return stars + user.slice(-keep) + '@' + domain;
  };

  const [password, setPassword]       = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [loading, setLoading]         = useState(false);
  const [toast, setToast]             = useState({ text: "", type: "" });

  // Tự động ẩn toast sau 6s
  useEffect(() => {
    if (toast.text) {
      const timer = setTimeout(() => setToast({ text: "", type: "" }), 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setToast({ text: 'Mật khẩu phải có ít nhất 6 ký tự!', type: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      setToast({ text: 'Mật khẩu không khớp!', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const url = new URL('http://localhost:8080/api/otp/change-password');
      url.searchParams.set('email', email);
      url.searchParams.set('otp', otp);
      url.searchParams.set('newPassword', password);

      const res  = await fetch(url.toString(), { method: 'POST' });
      const text = await res.text();
      if (!res.ok) throw new Error(text || 'Đổi mật khẩu thất bại');

      setToast({ text: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.', type: 'success' });
      setTimeout(() => navigate('/login'), 1500); // Chờ 1.5s cho toast hiện rồi chuyển trang
    } catch (err) {
      console.error(err);
      setToast({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="reset-wrapper"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="reset-container">
        <img src={LogoImg} alt="Logo" className="logo-image" />
        <h2 className="title">Tạo mật khẩu mới</h2>
        <p className="subtitle">
          Email: <strong>{maskEmail(email)}</strong><br/>
          Nhập mật khẩu mới cho tài khoản của bạn.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="password">Mật khẩu mới</label>
          <input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu mới"
            className="input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <label className="label" htmlFor="confirm">Nhập lại mật khẩu</label>
          <input
            type="password"
            id="confirm"
            placeholder="Nhập lại mật khẩu"
            className="input-field"
            value={confirmPassword}
            onChange={e => setConfirm(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
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

export default ResetPassword;
