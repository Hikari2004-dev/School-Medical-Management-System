import React from "react";
import "../Login/Login.css";

function Login() {
  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('../image/backgroundyte.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "24rem",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          padding: "2rem",
          borderRadius: "1.5rem",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img
            src="../image/14 1.png"
            alt="Logo thuốc"
            style={{ margin: "0 auto", width: "4rem", height: "4rem" }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginTop: "0.5rem",
            }}
          >
            Đăng nhập
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input-custom"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              className="input-custom"
              required
            />
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
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input type="checkbox" style={{ accentColor: "#3b82f6" }} />
              Ghi nhớ đăng nhập
            </label>

            <div className="link-group">
              <a href="Register.html">Tạo tài khoản mới</a>
              <a href="./forgetpassword.html">Quên mật khẩu</a>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit">
            Continue
          </button>

          {/* OR line */}
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

          {/* Google Button */}
          <button type="button" className="btn-google">
            <img
              src="../image/logo google.png"
              alt="Google"
              className="google-icon"
            />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
