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
<<<<<<< Updated upstream
    fetch("http://localhost:8080/health-profile/1")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => setProfile(null));
=======
    fetch("http://localhost:8080/api/healthinfo/1")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu");
        return res.json();
      })
      .then((res) => {
        const data = res.data;
        const formattedProfile = {
          allergies: data.allergy || "",
          vision: data.vision || "",
          body: `Cao ${data.height}cm - Nặng ${data.weight}kg (BMI: ${data.bmi})`,
          general: data.chronicDisease || "",
          history: data.medicalHistory ? [data.medicalHistory] : [], // đảm bảo luôn là mảng
        };
        setProfile(formattedProfile);
      })
      .catch((err) => {
        console.error("Không thể tải dữ liệu hồ sơ:", err);
      });
>>>>>>> Stashed changes
  }, []);

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleHistoryChange = (index, value) => {
    const updated = [...profile.history];
    updated[index] = value;
    setProfile({ ...profile, history: updated });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      const payload = {
        allergy: profile.allergies,
        vision: profile.vision,
        chronicDisease: profile.general,
        medicalHistory: profile.history[0] || "",
        height: parseFloat(profile.body.match(/Cao (\d+(?:\.\d+)?)cm/)?.[1]) || 0,
        weight: parseFloat(profile.body.match(/Nặng (\d+(?:\.\d+)?)kg/)?.[1]) || 0,
        bmi: parseFloat(profile.body.match(/\(BMI: (\d+(?:\.\d+)?)\)/)?.[1]) || 0,
        studentId: 1,
      };

      fetch("http://localhost:8080/api/healthinfo/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Lỗi khi cập nhật");
          return res.json();
        })
        .then(() => {
          alert("✅ Đã lưu thành công!");
          setIsEditing(false);
        })
        .catch((err) => {
          alert("❌ Lưu thất bại: " + err.message);
        });
    } else {
      setIsEditing(true);
    }
  };

  if (!profile) return <div>Đang tải dữ liệu hồ sơ...</div>;

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
<<<<<<< Updated upstream
              <h2>{profile.name}</h2>
              <p>
                Lớp {profile.class} | GVCN: {profile.teacher}
              </p>
              <p>
                Chiều cao: {profile.height} | Cân nặng: {profile.weight}
              </p>
              <p>Giới tính: {profile.gender}</p>
=======
              <h2>Học sinh</h2>
              <p>Lớp -- | GVCN: --</p>
              <p>{profile.body || "--"}</p>
              <p>Giới tính: --</p>
>>>>>>> Stashed changes
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
                    {Array.isArray(profile.history) && profile.history.length > 0 ? (
                      profile.history.map((entry, index) => (
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
                      ))
                    ) : (
                      <p>Không có dữ liệu lịch sử.</p>
                    )}
                  </ul>
                </div>
<<<<<<< Updated upstream
                <button
                  onClick={handleEditToggle}
                  className="home-button"
                  style={{ marginTop: "20px" }}
                >
=======

                <button onClick={handleEditToggle} className="home-button" style={{ marginTop: "20px" }}>
>>>>>>> Stashed changes
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
