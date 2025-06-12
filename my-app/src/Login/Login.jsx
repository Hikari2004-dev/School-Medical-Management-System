import React, { useState } from "react";
import "./Login.css";
import LogoImg from "../image/14 1.png";
import GoogleLogo from "../image/logo google.png";

function Login() {
  const [capsLockOn, setCapsLockOn] = useState(false);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Logo */}
        <div className="login-header">
          <img src={LogoImg} alt="Logo thuốc" className="logo" />
          <h2 className="login-title">Đăng nhập</h2>
        </div>

        <form className="login-form">
          {/* Email */}
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input-custom"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              className="input-custom"
              required
              onKeyUp={(e) => setCapsLockOn(e.getModifierState("CapsLock"))}
            />
            {capsLockOn && (
              <p className="caps-warning">Caps Lock đang bật</p>
            )}
          </div>

          {/* Options */}
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" className="checkbox" />
              Ghi nhớ đăng nhập
            </label>
            <div className="link-group">
              <a href="/Register.html">Tạo tài khoản mới</a>
              <a href="/forgetpassword.html">Quên mật khẩu</a>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-submit">
            Continue
          </button>

          {/* OR Divider */}
          <div className="divider">
            <hr className="divider-line" />
            <span className="divider-text">OR</span>
            <hr className="divider-line" />
          </div>

          {/* Google Login */}
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
