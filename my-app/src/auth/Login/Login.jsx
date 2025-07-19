// src/auth/Login/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';  // Import jwtDecode

import "./Login.css";
import LogoImg from "../../image/hinhanh/logoproject.png";
import Background from "../../image/hinhanh/backgroundauth.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Đăng nhập bằng Google
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const decoded = jwtDecode(credential);
      // Gửi thông tin Google đến backend để xác thực và lấy role
      const res = await fetch("http://localhost:8080/login/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.name,
          googleId: decoded.sub,
        }),
      });
      if (!res.ok) throw new Error("Đăng nhập Google thất bại");
      const data = await res.json();
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      redirectByRole(data.role);
    } catch (error) {
      alert("Đăng nhập Google thất bại!");
    }
  };
  // ✅ Đăng nhập bằng email/mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Đăng nhập thất bại");
      const data = await res.json();

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

      if (data.role === "Admin") {
        navigate("/admin");
      } else if (data.role === "Parent") {
        navigate("/");
      } else if (data.role === "SchoolNurse") {
        navigate("/nurse");
      } else {
        alert("Vai trò không được hỗ trợ!");
      }
    } catch (error) {
      alert("Đăng nhập thất bại!");
    }
  };

  // ✅ Xử lý điều hướng theo role
  const redirectByRole = (role) => {
    if (role === "Admin") {
      navigate("/admin");
    } else if (role === "SchoolNurse") {
      navigate("/nurse");
    } else if (role === "Parent") {
      navigate("/");
    } else {
      alert("Vai trò không được hỗ trợ!");
    }
  };

  return (
    <GoogleOAuthProvider clientId="493912650211-kqoj7t293bdhfgepv1q7kh7vik3o0852.apps.googleusercontent.com">
      <div className="login-wrapper" style={{ backgroundImage: `url(${Background})` }}>
        <div className="login-box">
          <img src={LogoImg} alt="Logo" className="login-logo" />
          <h2 className="login-title">Đăng nhập</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label className="login-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input-custom"
                required
              />
            </div>

            <div>
              <label className="login-label">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="input-custom"
                required
              />
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
            <button type="submit" className="btn-submit">Tiếp tục</button>
          </form>

          {/* Google Login Button */}
          <div className="google-login-container">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => alert("Đăng nhập Google thất bại!")}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
