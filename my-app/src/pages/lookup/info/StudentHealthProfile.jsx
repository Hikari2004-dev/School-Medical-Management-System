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
    id: 1, // 👈 Thêm id vào profile
    allergy: "",
    chronicDisease: "",
    medicalHistory: "",
    vision: "",
    hearing: "",
    height: "",
    weight: "",
    bmi: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return console.warn("⚠️ No token found");

    fetch("http://localhost:8080/api/healthinfo/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu hồ sơ");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          setProfile({ id: 1, ...data.data }); // 👈 Giữ lại id khi set
        } else {
          console.warn("Không có dữ liệu hồ sơ:", data.message);
        }
      })
      .catch((err) => console.error("Lỗi fetch:", err));
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      const token = localStorage.getItem("token");
      if (!token) return console.error("⚠️ Không có token");

      const payload = { ...profile, id: 1 }; // 👈 đảm bảo có id

      const putRequest = fetch("http://localhost:8080/api/healthinfo/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const saveRequest = fetch("http://localhost:8080/api/healthinfo/save/1", {
        method: "PUT", // ✅ Sửa từ POST thành PUT nếu backend yêu cầu
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      Promise.all([putRequest, saveRequest])
        .then(async ([putRes, saveRes]) => {
          const putData = await putRes.json().catch(() => null);
          const saveData = await saveRes.json().catch(() => null);

          console.log("PUT /1 status:", putRes.status, putData);
          console.log("PUT /save/1 status:", saveRes.status, saveData);

          if (!putRes.ok || !saveRes.ok) {
            throw new Error("❌ Một trong các yêu cầu cập nhật thất bại");
          }
        })
        .catch((err) => {
          console.error("❌ Lỗi khi cập nhật:", err);
        });
    }

    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    const updated = { ...profile, [field]: value };
    if (field === "height" || field === "weight") {
      const h = field === "height" ? parseFloat(value) : parseFloat(updated.height);
      const w = field === "weight" ? parseFloat(value) : parseFloat(updated.weight);
      if (h > 0 && w > 0) {
        updated.bmi = (w / ((h / 100) ** 2)).toFixed(2);
      }
    }
    setProfile(updated);
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
        <button onClick={() => navigate("/")} className="home-button">
          ⬅ Quay về trang chính
        </button>

        <div className="profile-card">
          <div className="profile-overview">
            <img src={AvatarImg} alt="avatar" className="avatar" />
            <div className="info-text">
              <h2>Thông tin hồ sơ sức khỏe</h2>
              <p>Thông tin chi tiết về tình trạng sức khỏe học sinh</p>
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
            <div className="info-columns">
              <div className="contact-left">
                <label><strong>Dị ứng:</strong></label>
                {isEditing ? (
                  <input
                    className="input-line"
                    value={profile.allergy}
                    onChange={(e) => handleChange("allergy", e.target.value)}
                  />
                ) : (
                  <p>{profile.allergy}</p>
                )}

                <label><strong>Bệnh mãn tính:</strong></label>
                {isEditing ? (
                  <input
                    className="input-line"
                    value={profile.chronicDisease}
                    onChange={(e) => handleChange("chronicDisease", e.target.value)}
                  />
                ) : (
                  <p>{profile.chronicDisease}</p>
                )}

                <label><strong>Lịch sử bệnh:</strong></label>
                {isEditing ? (
                  <input
                    className="input-line"
                    value={profile.medicalHistory}
                    onChange={(e) => handleChange("medicalHistory", e.target.value)}
                  />
                ) : (
                  <p>{profile.medicalHistory}</p>
                )}
              </div>

              <div className="contact-right">
                <label><strong>Thị lực:</strong></label>
                {isEditing ? (
                  <input
                    className="input-line"
                    value={profile.vision}
                    onChange={(e) => handleChange("vision", e.target.value)}
                  />
                ) : (
                  <p>{profile.vision}</p>
                )}

                <label><strong>Thính lực:</strong></label>
                {isEditing ? (
                  <input
                    className="input-line"
                    value={profile.hearing}
                    onChange={(e) => handleChange("hearing", e.target.value)}
                  />
                ) : (
                  <p>{profile.hearing}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleEditToggle}
              className="home-button"
              style={{ marginTop: "20px" }}
            >
              {isEditing ? "💾 Lưu lại" : "✏️ Chỉnh sửa"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentHealthProfile;
