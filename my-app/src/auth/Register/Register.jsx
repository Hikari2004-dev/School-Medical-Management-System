import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

import LogoImg from "../../image/hinhanh/logoproject.png";
import GoogleLogo from "../../image/icon/LogoGoogle.png";
import Background from "../../image/hinhanh/backgroundauth.png";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("❌ Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Đăng ký thất bại");
      }

      alert("✅ Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert("❌ Lỗi: " + error.message);
    }
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
            <label className="label">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="inputCustom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="inputCustom"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

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
            <label className="label">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="inputCustom"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="inputCustom"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Gender</label>
            <select
              name="gender"
              className="inputCustom"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
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
