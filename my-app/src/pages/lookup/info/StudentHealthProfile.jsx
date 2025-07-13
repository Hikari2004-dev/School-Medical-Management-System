import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";
import "./StudentHealthProfile.css";

const StudentHealthProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };

  const activeTab = tabRoutes[location.pathname] || "Hồ sơ sức khỏe";

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    allergy: "",
    chronicDisease: "",
    vision: "",
    hearing: "",
    medicalHistory: "",
    height: "",
    weight: "",
    bmi: "",
  });

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:8080/api/healthinfo/1")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile(data.data);
        } else {
          console.error("Lỗi API:", data.message);
        }
      })
      .catch((err) => {
        console.error("Fetch lỗi:", err);
      });
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
    if (path && location.pathname !== path) {
      navigate(path);
    }
  };

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
              <p>Chiều cao: {profile.height}cm | Cân nặng: {profile.weight}kg</p>
              <p>BMI: {profile.bmi} | Giới tính: Nam/Nữ</p>
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
            {activeTab === "Hồ sơ sức khỏe" ? (
              <>
                <div className="info-columns">
                  <div>
                    <label><strong>Dị ứng:</strong></label>
                    {isEditing ? (
                      <input className="input-line" value={profile.allergy} onChange={(e) => handleChange("allergy", e.target.value)} />
                    ) : (
                      <p>{profile.allergy}</p>
                    )}

                    <label><strong>Bệnh mãn tính:</strong></label>
                    {isEditing ? (
                      <input className="input-line" value={profile.chronicDisease} onChange={(e) => handleChange("chronicDisease", e.target.value)} />
                    ) : (
                      <p>{profile.chronicDisease}</p>
                    )}

                    <label><strong>Lịch sử bệnh:</strong></label>
                    {isEditing ? (
                      <input className="input-line" value={profile.medicalHistory} onChange={(e) => handleChange("medicalHistory", e.target.value)} />
                    ) : (
                      <p>{profile.medicalHistory}</p>
                    )}
                  </div>

                  <div>
                    <label><strong>Thị lực:</strong></label>
                    {isEditing ? (
                      <input className="input-line" value={profile.vision} onChange={(e) => handleChange("vision", e.target.value)} />
                    ) : (
                      <p>{profile.vision}</p>
                    )}

                    <label><strong>Thính lực:</strong></label>
                    {isEditing ? (
                      <input className="input-line" value={profile.hearing} onChange={(e) => handleChange("hearing", e.target.value)} />
                    ) : (
                      <p>{profile.hearing}</p>
                    )}
                  </div>
                </div>

                <button onClick={handleEditToggle} className="home-button" style={{ marginTop: "20px" }}>
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

export default StudentHealthProfile;
