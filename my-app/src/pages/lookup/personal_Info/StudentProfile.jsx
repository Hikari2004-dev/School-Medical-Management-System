import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentProfile.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };

  const activeTab = tabRoutes[location.pathname] || "Thông tin cá nhân";

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
    if (path && location.pathname !== path) {
      navigate(path, { state: { from: location.pathname } });
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    mother: "Trần Thị Hoa",
    motherPhone: "0909 123 456",
    father: "Nguyễn Văn B",
    fatherPhone: "0908 654 321",
    email: "duy.khanh@example.com",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  return (
    <div className="student-profile-page">
      <aside className="sidebar">
        <div className="brand-box">
          <img src={LogoImg} alt="Logo" className="brand-icon" />
          <div className="brand-text">
            <h1>SchoMed</h1>
            <p>School Medical</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => navigate("/patient-search")} className={location.pathname === "/patient-search" ? "active" : ""}>🏠 Trang chủ</button>
          <button onClick={() => navigate("/medications")} className={location.pathname === "/medications" ? "active" : ""}>💊 Đơn thuốc</button>
          <button onClick={() => navigate("/vaccinations")} className={location.pathname === "/vaccinations" ? "active" : ""}>💉 Sổ vaccine</button>
          <button onClick={() => navigate("/health-record")} className={location.pathname === "/health-record" ? "active" : ""}>📁 Hồ sơ sức khỏe</button>
        </nav>
      </aside>

      <main className="profile-main">
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅ Quay về trang chính
        </button>

        <div className="profile-card">
          <div className="profile-overview">
            <img src={AvatarImg} alt="avatar" className="avatar" />
            <div className="info-text">
              <h2>Nguyễn Đoàn Duy Khánh</h2>
              <p>Lớp 12A1 | GVCN: Lâm Phương Thúy</p>
              <p>Chiều cao: 170cm | Cân nặng: 60 kg</p>
              <p>Giới tính: Nam/Nữ</p>
            </div>
          </div>

          <div className="profile-tabs">
            {Object.values(tabRoutes).map((label) => (
              <span
                key={label}
                className={`tab ${activeTab === label ? "active" : ""}`}
                onClick={() => handleTabClick(label)}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="profile-detail">
            {activeTab === "Thông tin cá nhân" ? (
              <>
                <div className="info-columns">
                  <div>
                    <p><strong>Mẹ:</strong> {isEditing ? (
                      <input className="input-line" value={profile.mother} onChange={(e) => handleChange("mother", e.target.value)} />
                    ) : profile.mother}</p>

                    <p><strong>Điện Thoại:</strong> {isEditing ? (
                      <input className="input-line" value={profile.motherPhone} onChange={(e) => handleChange("motherPhone", e.target.value)} />
                    ) : profile.motherPhone}</p>

                    <p><strong>Ba:</strong> {isEditing ? (
                      <input className="input-line" value={profile.father} onChange={(e) => handleChange("father", e.target.value)} />
                    ) : profile.father}</p>

                    <p><strong>Điện Thoại:</strong> {isEditing ? (
                      <input className="input-line" value={profile.fatherPhone} onChange={(e) => handleChange("fatherPhone", e.target.value)} />
                    ) : profile.fatherPhone}</p>
                  </div>
                  <div>
                    <p><strong>Email:</strong> {isEditing ? (
                      <input className="input-line" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} />
                    ) : profile.email}</p>

                    <p><strong>Địa chỉ:</strong> {isEditing ? (
                      <input className="input-line" value={profile.address} onChange={(e) => handleChange("address", e.target.value)} />
                    ) : profile.address}</p>
                  </div>
                </div>
                <button className="home-button" style={{ marginTop: "20px" }} onClick={handleEditToggle}>
                  {isEditing ? "💾 Lưu lại" : "✏️ Chỉnh sửa"}
                </button>
              </>
            ) : (
              <p className="tab-placeholder">Hiện chưa có dữ liệu cho mục "{activeTab}".</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
