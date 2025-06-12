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
        <div className="login-header" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img src={LogoImg} alt="Logo thuốc" className="logo" style={{ margin: "0 auto", width: "4rem", height: "4rem" }} />
          <h2 className="login-title" style={{ fontSize: "1.5rem", fontWeight: "600", marginTop: "0.5rem" }}>
            Đăng nhập
          </h2>
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

          {/* Checkbox + Links */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.875rem",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" style={{ accentColor: "#3b82f6" }} />
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0.5rem 0",
            }}
          >
            <hr style={{ flexGrow: 1, borderColor: "#d1d5db" }} />
            <span
              style={{
                margin: "0 0.5rem",
                fontSize: "0.875rem",
                color: "#6b7280",
              }}
            >
              OR
            </span>
            <hr style={{ flexGrow: 1, borderColor: "#d1d5db" }} />
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
