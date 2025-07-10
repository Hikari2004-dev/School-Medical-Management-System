import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

import LogoImg from "../../image/hinhanh/logoproject.png";
import GoogleLogo from "../../image/icon/LogoGoogle.png";
import Background from "../../image/hinhanh/backgroundauth.png";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Validate form & call backend API
    // For now, just go to Login page
    console.log("Form data:", formData);
    navigate("/login");
  };

  return (
    <div className="registerPage" style={{ backgroundImage: `url(${Background})` }}>
      <div className="registerContainer">
        <div className="logoSection">
          <img src={LogoImg} alt="Logo" className="logoImage" />
          <h2 className="heading">Welcome to SchoMed</h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="inputCustom"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="inputCustom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="inputCustom"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              className="inputCustom"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btnSubmit">Continue</button>

          <div className="dividerRow">
            <hr className="dividerLine" />
            <span className="dividerText">OR</span>
            <hr className="dividerLine" />
          </div>

          <button type="button" className="btnGoogle">
            <img src={GoogleLogo} alt="Google" className="googleIcon" />
            <span>Continue with Google</span>
          </button>
        </form>

        <div className="footerLink">
          <Link to="/login" className="linkText">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
