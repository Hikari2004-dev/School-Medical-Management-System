import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

import LogoImg from "../../image/hinhanh/logoproject.png";
import Background from "../../image/hinhanh/backgroundauth.png";
import GoogleLogo from "../../image/icon/LogoGoogle.png";
import MailIcon from "../../image/icon/thongbao2.png";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/otp-verification", { state: { email } });
  };

  return (
    <div className="forget-wrapper" style={{ backgroundImage: `url(${Background})` }}>
      <div className="forget-container">
        <img src={LogoImg} alt="Logo" className="logo-image" />
        <h2 className="title">Forget Password</h2>
        <p className="subtitle">
          Don’t worry! Enter your email address and we’ll send you password rest.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="label">Email Address</label>
          <div className="input-wrapper">
            <img src={MailIcon} alt="Mail Icon" className="mail-icon" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-email"
            />
          </div>

          <button type="submit" className="btn-submit">Continue</button>

          <div className="divider-row">
            <hr className="divider-line" />
            <span className="divider-text">OR</span>
            <hr className="divider-line" />
          </div>

          <button type="button" className="btn-google">
            <img src={GoogleLogo} alt="Google" className="google-icon" />
            Continue with Google
          </button>
        </form>

        <div className="back-link">
          <a href="/login">&larr; Back to login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
