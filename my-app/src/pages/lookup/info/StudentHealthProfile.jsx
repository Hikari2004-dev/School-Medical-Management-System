import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

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
  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
    if (path && location.pathname !== path) {
      navigate(path, { state: { from: location.pathname } });
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/health-profile/1")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => setProfile(null));
  }, []);

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleHistoryChange = (index, value) => {
    const updated = [...profile.history];
    updated[index] = value;
    setProfile({ ...profile, history: updated });
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  if (!profile) {
    return <div>Đang tải dữ liệu...</div>;
  }

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
            className={location.pathname === "/patient-search" ? "active" : ""}
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

        <div className="profile-card">
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
                    <label>
                      <strong>Dị ứng:</strong>
                    </label>
                    {isEditing ? (
                      <input
                        className="input-line"
                        value={profile.allergies}
                        onChange={(e) =>
                          handleInputChange("allergies", e.target.value)
                        }
                      />
                    ) : (
                      <p>{profile.allergies}</p>
                    )}
                    <label>
                      <strong>Thị lực:</strong>
                    </label>
                    {isEditing ? (
                      <input
                        className="input-line"
                        value={profile.vision}
                        onChange={(e) => handleInputChange("vision", e.target.value)}
                      />
                    ) : (
                      <p>{profile.vision}</p>
                    )}
                  </div>
                  <div>
                    <label>
                      <strong>Chỉ số cơ thể:</strong>
                    </label>
                    {isEditing ? (
                      <input
                        className="input-line"
                        value={profile.body}
                        onChange={(e) => handleInputChange("body", e.target.value)}
                      />
                    ) : (
                      <p>{profile.body}</p>
                    )}
                    <label>
                      <strong>Tổng quát:</strong>
                    </label>
                    {isEditing ? (
                      <input
                        className="input-line"
                        value={profile.general}
                        onChange={(e) => handleInputChange("general", e.target.value)}
                      />
                    ) : (
                      <p>{profile.general}</p>
                    )}
                  </div>
                </div>

                <div className="history-card">
                  <h4>Lịch sử khám gần đây</h4>
                  <ul>
                    {profile.history.map((entry, index) => (
                      <li key={index}>
                        {isEditing ? (
                          <input
                            className="input-line"
                            value={entry}
                            onChange={(e) => handleHistoryChange(index, e.target.value)}
                          />
                        ) : (
                          entry
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleEditToggle}
                  className="home-button"
                  style={{ marginTop: "20px" }}
                >
                  {isEditing ? "💾 Lưu lại" : "✏️ Chỉnh sửa"}
                </button>
              </>
            ) : (
              <p className="tab-placeholder">
                Hiện chưa có dữ liệu cho mục "{activeTab}".
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentHealthProfile;