import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./Login.css";
import LogoImg from "../../image/hinhanh/logoproject.png";
import Background from "../../image/hinhanh/backgroundauth.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Đăng nhập email/mật khẩu
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

      redirectByRole(data.role);
    } catch (err) {
      alert("Đăng nhập thất bại!");
    }
  };

  // ✅ Đăng nhập bằng Google
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;

      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenId }),
      });

      if (!res.ok) throw new Error("Xác thực Google thất bại");

      const data = await res.json();

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

      redirectByRole(data.role);
    } catch (err) {
      console.error("❌ Đăng nhập Google thất bại:", err);
      alert("Đăng nhập Google thất bại!");
    }
  };

  // ✅ Điều hướng theo vai trò
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

          {/* Google Login */}
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
