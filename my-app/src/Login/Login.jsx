import React from "react";

import "./Login.css";
import LogoImg from "../image/14 1.png";
import GoogleLogo from "../image/logo google.png";
import Background from "../image/backgroundyte.jpg";
function Login() {
  return (
    <div

      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        minHeight: "100vh",

        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-lg"
        style={{
          width: "100%",
          maxWidth: "24rem",

          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          padding: "2rem",
          borderRadius: "1.5rem",

          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}

        <div
          className="text-center mb-6"
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <img

            src={LogoImg}
            alt="Logo thuốc"
            className="mx-auto w-16 h-16"
            style={{ margin: "0 auto", width: "4rem", height: "4rem" }}
          />

          <h2
            className="text-2xl font-semibold mt-2"
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
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

            <label className="block text-sm font-medium" >Email</label>
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
            className="flex justify-between items-center text-sm"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.875rem",
            }}
          >

            <label
              className="flex items-center gap-2"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                className="accent-blue-500"
                style={{ accentColor: "#3b82f6" }}
              />
              Ghi nhớ đăng nhập
            </label>

            <div className="link-group">

              <a href="/Register.html">Tạo tài khoản mới</a>
              <a href="/forgetpassword.html">Quên mật khẩu</a>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit">
            Continue
          </button>


          {/* OR */}
          <div
            className="flex items-center my-2"
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0.5rem 0",
            }}
          >
            <hr
              className="flex-grow border-gray-300"
              style={{ flexGrow: 1, borderColor: "#d1d5db" }}
            />
            <span
              className="mx-2 text-sm text-gray-500"
              style={{
                margin: "0 0.5rem",
                fontSize: "0.875rem",
                color: "#6b7280",
              }}
            >
              OR
            </span>

            <hr
              className="flex-grow border-gray-300"
              style={{ flexGrow: 1, borderColor: "#d1d5db" }}
            />
          </div>

          {/* Logo google */}
          <button type="button" className="btn-google">

            <img
              src={GoogleLogo}
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
