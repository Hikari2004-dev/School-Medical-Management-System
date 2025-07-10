import React, { useState } from 'react';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';

import LogoImg from '../../image/hinhanh/logoproject.png';
import Background from '../../image/hinhanh/backgroundauth.png';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra độ dài tối thiểu
    if (password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    // Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    // TODO: Gửi API đặt lại mật khẩu tại đây
    console.log('Mật khẩu mới:', password);

    // Sau khi đổi thành công
    navigate('/login');
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
          Nhập mật khẩu mới cho tài khoản của bạn để đăng nhập.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="password">Mật khẩu mới</label>
          <input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu mới"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="label" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-submit">
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
