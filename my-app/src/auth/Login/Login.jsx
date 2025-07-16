// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import "./Login.css";
// import LogoImg from '../../image/hinhanh/logoproject.png';
// import GoogleLogo from '../../image/icon/LogoGoogle.png';
// import Background from '../../image/hinhanh/backgroundauth.png';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:8080/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     if (res.ok) {
//       const data = await res.json();
//       // Lưu JWT và tên người dùng
//       localStorage.setItem("token", data.jwt);
//       localStorage.setItem("userName", data.name);

//       navigate("/"); // hoặc trang dashboard
//     } else {
//       alert("Đăng nhập thất bại!");
//     }
//   };

//   return (
//     <div className="login-wrapper" style={{ backgroundImage: `url(${Background})` }}>
//       <div className="login-box">
//         <img src={LogoImg} alt="Logo" className="login-logo" />
//         <h2 className="login-title">Đăng nhập</h2>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <div>
//             <label className="login-label">Email</label>
//             <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input-custom" required />
//           </div>

//           <div>
//             <label className="login-label">Mật khẩu</label>
//             <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" className="input-custom" required />
//           </div>

//           <div className="checkbox-links">
//             <label className="remember-label">
//               <input type="checkbox" className="checkbox" />
//               Ghi nhớ đăng nhập
//             </label>
//             <div className="link-group">
//               <Link to="/register">Tạo tài khoản mới</Link>
//               <Link to="/forget-password">Quên mật khẩu</Link>
//             </div>
//           </div>

//           <button type="submit" className="btn-submit">Continue</button>

//           <div className="or-separator">
//             <hr className="dividerLine" />
//             <span className="dividerText">OR</span>
//             <hr className="dividerLine" />
//           </div>

//           <button type="button" className="btn-google">
//             <img src={GoogleLogo} alt="Google" className="google-icon" />
//             <span>Continue with Google</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import LogoImg from '../../image/hinhanh/logoproject.png';
import GoogleLogo from '../../image/icon/LogoGoogle.png';
import Background from '../../image/hinhanh/backgroundauth.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("role", data.role);

      if (data.role === "Admin") {
        navigate("/admin");
      } else if (data.role === "Parent") {
        navigate("/");
      } else {
        alert("Vai trò không được hỗ trợ!");
      }
    } else {
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${Background})` }}>
      <div className="login-box">
        <img src={LogoImg} alt="Logo" className="login-logo" />
        <h2 className="login-title">Đăng nhập</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label className="login-label">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input-custom" required />
          </div>

          <div>
            <label className="login-label">Mật khẩu</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" className="input-custom" required />
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

          <button type="submit" className="btn-submit">Continue</button>

          <div className="or-separator">
            <hr className="dividerLine" />
            <span className="dividerText">OR</span>
            <hr className="dividerLine" />
          </div>

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

