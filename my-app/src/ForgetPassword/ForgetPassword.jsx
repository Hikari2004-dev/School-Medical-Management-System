import React from "react";

function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <img
          src="https://img.icons8.com/color/96/medical-doctor.png"
          alt="medicine-icon"
          className="icon"
        />
        <h2>Forget Password</h2>
        <p>Don’t worry! Enter your email address and we’ll send you password rest.</p>

        <label>Email Address</label>
        <div className="input-wrapper">
          <span className="email-icon">📧</span>
          <input type="email" placeholder="Enter your email address" />
        </div>

        <button className="continue-button">Continue</button>

        <div className="or">OR</div>

        <button className="google-button">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google icon"
          />
          Continue with Google
        </button>

        <a href="/login" className="back-link">← Back to login</a>
      </div>
    </div>
  );
}

export default ForgotPassword;
