import React, { useState, useEffect } from "react";
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
<<<<<<< Updated upstream
  const [studentProfiles, setStudentProfiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/my-children")
      .then((res) => res.json())
      .then((data) => setStudentProfiles(data))
      .catch(() => setStudentProfiles([]));
  }, []);
=======
>>>>>>> Stashed changes

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
          <button
            onClick={() => navigate("/patient-search")}
            className={
              location.pathname === "/patient-search" ? "active" : ""
            }
          >
            🏠 Trang chủ
          </button>
          <button
            onClick={() => navigate("/medications")}
            className={location.pathname === "/medications" ? "active" : ""}
          >
            💊 Đơn thuốc
          </button>
          <button
            onClick={() => navigate("/vaccinations")}
            className={location.pathname === "/vaccinations" ? "active" : ""}
          >
            💉 Sổ vaccine
          </button>
          <button
            onClick={() => navigate("/health-record")}
            className={location.pathname === "/health-record" ? "active" : ""}
          >
            📁 Hồ sơ sức khỏe
          </button>
        </nav>
      </aside>

      <main className="profile-main">
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅ Quay về trang chính
        </button>

        {studentProfiles.map((profile, idx) => (
          <div className="profile-card" key={idx}>
            <div className="profile-overview">
              <img src={AvatarImg} alt="avatar" className="avatar" />
              <div className="info-text">
                <h2>{profile.name}</h2>
                <p>
                  Lớp {profile.class} | GVCN: {profile.teacher}
                </p>
                <p>
                  Chiều cao: {profile.height} | Cân nặng: {profile.weight}
                </p>
                <p>Giới tính: {profile.gender}</p>
              </div>
            </div>

            <div className="profile-tabs">
              {Object.values(tabRoutes).map((label) => (
                <span
                  key={label}
                  className={`tab ${activeTab === label ? "active" : ""}`}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="profile-detail">
              {activeTab === "Thông tin cá nhân" ? (
<<<<<<< Updated upstream
                <>
                  <div className="info-columns">
                    <div>
                      <p>
                        <strong>Mẹ:</strong> {profile.mother}
                      </p>
                      <p>
                        <strong>Điện Thoại:</strong> {profile.motherPhone}
                      </p>
                      <p>
                        <strong>Ba:</strong> {profile.father}
                      </p>
                      <p>
                        <strong>Điện Thoại:</strong> {profile.fatherPhone}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Email:</strong> {profile.email}
                      </p>
                      <p>
                        <strong>Địa chỉ:</strong> {profile.address}
                      </p>
                    </div>
                  </div>
                </>
=======
                <div className="info-columns">
                  <div>
                    <p><strong>Phụ huynh:</strong> {profile.mother} - {profile.motherPhone}</p>
                  </div>
                  <div>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Địa chỉ:</strong> {profile.address}</p>
                  </div>
                </div>
>>>>>>> Stashed changes
              ) : (
                <p className="tab-placeholder">
                  Hiện chưa có dữ liệu cho mục "{activeTab}".
                </p>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default StudentProfile;
