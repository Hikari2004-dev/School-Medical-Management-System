import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import LogoImg from '../../image/hinhanh/logoproject.png';
import GoogleLogo from '../../image/icon/LogoGoogle.png';
import Background from '../../image/hinhanh/backgroundauth.png';

function Login() {
  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${Background})` }}>
      <div className="login-box">
        <img src={LogoImg} alt="Logo" className="login-logo" />
        <h2 className="login-title">Đăng nhập</h2>

        <form className="login-form">
          <div>
            <label className="login-label">Email</label>
            <input type="email" placeholder="Email" className="input-custom" required />
          </div>

          <div>
            <label className="login-label">Mật khẩu</label>
            <input type="password" placeholder="Mật khẩu" className="input-custom" required />
          </div>

          <div className="checkbox-links">
            <label className="remember-label">
              <input type="checkbox" className="checkbox" />
              Ghi nhớ đăng nhập
            </label>
            <div className="link-group">
              <Link to="/register">Tạo tài khoản mới</Link>
              <Link to="/forget-password">Quên mật khẩu</Link>
            </div>
          </div>

          <button type="submit" className="btn-submit">Continue</button>

          <div className="or-separator">
            <hr className="dividerLine" />
            <span className="dividerText">OR</span>
            <hr className="dividerLine" />
          </div>

          <button type="button" className="btn-google">
            <img src={GoogleLogo} alt="Google" className="google-icon" />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
