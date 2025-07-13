import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentProfile.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("⚠️ Không tìm thấy token trong localStorage");
      return;
    }

    fetch("http://localhost:8080/api/parent-info/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("❌ Không thể lấy dữ liệu phụ huynh.");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Dữ liệu phụ huynh:", data);
        setProfile(data);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch:", err);
      });
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

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
          <button onClick={() => navigate("/patient-search")} className={location.pathname === "/patient-search" ? "active" : ""}>
            🏠 Trang chủ
          </button>
          <button onClick={() => navigate("/medications")} className={location.pathname === "/medications" ? "active" : ""}>
            💊 Đơn thuốc
          </button>
          <button onClick={() => navigate("/vaccinations")} className={location.pathname === "/vaccinations" ? "active" : ""}>
            💉 Sổ vaccine
          </button>
          <button onClick={() => navigate("/health-record")} className={location.pathname === "/health-record" ? "active" : ""}>
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
                  <div className="contact-left">
                    <p>
                      <strong>Phụ huynh:</strong>{" "}
                      {isEditing ? (
                        <input className="input-line" value={profile.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                      ) : (
                        profile.fullName
                      )}
                    </p>

                    <p>
                      <strong>Điện thoại:</strong>{" "}
                      {isEditing ? (
                        <input className="input-line" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                      ) : (
                        profile.phone
                      )}
                    </p>
                  </div>

                  <div className="contact-right">
                    <p>
                      <strong>Email:</strong>{" "}
                      {isEditing ? (
                        <input className="input-line" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} />
                      ) : (
                        profile.email
                      )}
                    </p>

                    <p>
                      <strong>Địa chỉ:</strong>{" "}
                      {isEditing ? (
                        <input className="input-line" value={profile.address} onChange={(e) => handleChange("address", e.target.value)} />
                      ) : (
                        profile.address
                      )}
                    </p>
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
