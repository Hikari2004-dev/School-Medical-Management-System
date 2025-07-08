import React from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

import GoogleLogo from "../image/logo google.png";
import Background from "../image/backgroundyte.jpg";
import LogoImg from "../image/14 1.png";

// Component chính để hiển thị trang đăng ký
function Register() {
  return (
    // Phần nền của trang với ảnh nền từ biến Background
    <div
      className={styles.registerPage}
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      {/* Khung chứa toàn bộ nội dung form */}
      <div className={styles.registerContainer}>

        {/* Phần logo và tiêu đề */}
        <div className={styles.logoSection}>
          <img src={LogoImg} alt="Logo" className={styles.logoImage} />
          <h2 className={styles.heading}>Welcome to SchoMed</h2>
        </div>

        {/* Form đăng ký */}
        <form className={styles.form}>
          {/* Ô nhập họ tên */}
          <div>
            <label className={styles.label}>Full Name</label>
            <input type="text" placeholder="Full Name" className={styles.inputCustom} required />
          </div>

          {/* Ô nhập email */}
          <div>
            <label className={styles.label}>Email</label>
            <input type="email" placeholder="Email" className={styles.inputCustom} required />
          </div>

          {/* Ô nhập mật khẩu */}
          <div>
            <label className={styles.label}>Password</label>
            <input type="password" placeholder="Password" className={styles.inputCustom} required />
          </div>

          {/* Ô nhập lại mật khẩu để xác nhận */}
          <div>
            <label className={styles.label}>Confirm Password</label>
            <input type="password" placeholder="Repeat Password" className={styles.inputCustom} required />
          </div>

          {/* Nút đăng ký */}
          <button type="submit" className={styles.btnSubmit}>Register</button>

          {/* Phần phân cách giữa form và lựa chọn đăng ký bằng Google */}
          <div className={styles.dividerRow}>
            <hr className={styles.dividerLine} />
            <span className={styles.dividerText}>OR</span>
            <hr className={styles.dividerLine} />
          </div>

          {/* Nút đăng ký bằng Google */}
          <button type="button" className={styles.btnGoogle}>
            <img src={GoogleLogo} alt="Google" className={styles.googleIcon} />
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Link điều hướng đến trang đăng nhập nếu đã có tài khoản */}
        <div className={styles.footerLink}>
          <Link to="/login" className={styles.linkText}>
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
